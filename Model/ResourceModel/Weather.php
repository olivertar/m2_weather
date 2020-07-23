<?php
namespace Orangecat\Weather\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
use Orangecat\Weather\Api\Data\WeatherInterface;

class Weather extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('weather_cities', WeatherInterface::ID);
    }
}
