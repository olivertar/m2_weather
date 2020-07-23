<?php
namespace Orangecat\Weather\Model;

use Magento\Framework\Model\AbstractExtensibleModel;
use Orangecat\Weather\Api\Data\WeatherExtensionInterface;
use Orangecat\Weather\Api\Data\WeatherInterface;

class Weather extends AbstractExtensibleModel implements WeatherInterface
{
    protected function _construct()
    {
        parent::_construct();
        $this->_init(ResourceModel\Weather::class);
    }

    public function getWeatherId()
    {
        return $this->_getData(self::ID);
    }

    public function setWeatherId($id)
    {
        $this->setData(self::ID, $id);
    }

    public function getCity()
    {
        return $this->_getData(self::CITY);
    }

    public function setCity($city)
    {
        $this->setData(self::CITY, $city);
    }

    public function getJsondata()
    {
        return $this->_getData(self::JSONDATA);
    }

    public function setJsondata($jsondata)
    {
        $this->setData(self::JSONDATA, $jsondata);
    }

    public function getCreatedAt()
    {
        return $this->_getData(self::CREATED_AT);
    }

    public function setCreatedAt($date)
    {
        $this->setData(self::CREATED_AT, $date);
    }

    public function getImageUrls()
    {
        $this->_getData(self::IMAGE_URLS);
    }

    public function getExtensionAttributes()
    {
        return $this->_getExtensionAttributes();
    }

    public function setExtensionAttributes(WeatherExtensionInterface $extensionAttributes)
    {
        $this->_setExtensionAttributes($extensionAttributes);
    }
}
