<?php
namespace Orangecat\Weather\Model\Ajax;

use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\App\Request\Http;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\HTTP\PhpEnvironment\RemoteAddress;
use Orangecat\Geoip\Helper\Data as GeoIphelper;
use Orangecat\Weather\Api\AjaxWeatherInterface;
use Orangecat\Weather\Api\Data\WeatherInterface;
use Orangecat\Weather\Api\WeatherRepositoryInterface;
use Orangecat\Weather\Helper\Data as Helper;
use Psr\Log\LoggerInterface;

class AjaxWeatherManagement implements AjaxWeatherInterface
{
    const REQUEST_TIMEOUT = 30;

    private $logger;

    private $curl;

    private $http;

    private $helper;

    private $geoIphelper;

    private $remoteIp;

    private $searchCriteriaBuilder;

    private $weatherFactory;

    private $weatherRepository;

    public function __construct(
        LoggerInterface $logger,
        Curl $curl,
        Http $http,
        Helper $helper,
        GeoIphelper $geoIphelper,
        RemoteAddress $remoteIp,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        WeatherInterface $weatherFactory,
        WeatherRepositoryInterface $weatherRepository
    ) {
        $this->logger = $logger;
        $this->curl = $curl;
        $this->http = $http;
        $this->helper = $helper;
        $this->geoIphelper = $geoIphelper;
        $this->remoteIp = $remoteIp;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->weatherFactory = $weatherFactory;
        $this->weatherRepository = $weatherRepository;
    }

    public function getWeather()
    {
        // Get settings
        $api_key = $this->helper->getApiKey();
        $api_url = $this->helper->getConfigValue('weather/general/url');
        $units = $this->helper->getConfigValue('weather/general/units');
        $ttl = $this->helper->getConfigValue('weather/general/ttl');
        $ip = $this->helper->getConfigValue('weather/general/ip');
        $city = $this->helper->getConfigValue('weather/general/city');
        $message = $this->helper->getConfigValue('weather/general/message');

        $weather_id = '';
        $currentTime = time();
        $windowTime = $ttl * (60 * 60);

        if (empty($api_key) || empty($ttl)) {
            $this->logger->alert('No API Key or TTL configured');
            return '{"message":' . $message . '}';
        }

        if (empty($ip)) {
            $ip = $this->remoteIp->getRemoteAddress();
        }

        // If the user can't be geolocated, use the default city
        if ($this->geoIphelper->isEnabled()) {
            $geoipdata = $this->geoIphelper->getGeoIpData($ip);
            if (isset($geoipdata['city']) && !empty($geoipdata['city'])) {
                $city = $geoipdata['city'];
            }
        }

        // Search by city in DB
        $this->searchCriteriaBuilder->addFilter('city', $city, 'eq');
        $this->searchCriteriaBuilder->setPageSize(1)->setCurrentPage(1);
        $searchCriteria = $this->searchCriteriaBuilder->create();

        $weathers = $this->weatherRepository
            ->getList($searchCriteria)
            ->getItems();

        // Check data, if it exists and has a valid TTL
        if (count($weathers) > 0) {
            $item = current($weathers);
            if ($item->getJsondata()) {
                $date = \DateTime::createFromFormat('Y-m-d H:i:s', $item->getCreatedAt());
                $cacheTime = $date->getTimestamp();
                if (($cacheTime + $windowTime) > $currentTime) {
                    $data = $item->getJsondata();
                    return $data;
                } else {
                    $weather_id = $item->getWeatherId();
                }
            }
        }

        // Get data from open weather
        $url = $api_url . '?units=' . $units . '&q=' . $city . '&appid=' . $api_key;
        $this->curl->setTimeout(self::REQUEST_TIMEOUT);
        $this->curl->get($url);

        if ($this->curl->getStatus() !== 200) {
            $this->logger->warning('API Status: ', [$this->curl->getStatus()]);
            return '{"message":' . $message . '}';
        } else {
            $data = $this->curl->getBody();

            // Add/update data in the DB.
            $weather = $this->weatherFactory;
            $weather->setCity($city);
            $weather->setJsondata($data);
            if (!empty($weather_id)) {
                $weather->setCreatedAt(date("Y-m-d H:i:s"));
                $weather->setWeatherId($weather_id);
            }
            $this->weatherRepository->save($weather);

            return $data;
        }
    }
}
