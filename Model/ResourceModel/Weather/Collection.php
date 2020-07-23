<?php
namespace Orangecat\Weather\Model\ResourceModel\Weather;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;
use Orangecat\Weather\Model\Weather as Model;
use Orangecat\Weather\Model\ResourceModel\Weather as ResourceModel;
use Orangecat\Weather\Api\Data\WeatherInterface;

class Collection extends AbstractCollection
{

    protected $_idFieldName = WeatherInterface::ID;

    protected function _construct()
    {
        $this->_init(Model::class, ResourceModel::class);
    }
}
