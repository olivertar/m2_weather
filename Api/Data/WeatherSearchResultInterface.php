<?php
namespace Orangecat\Weather\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface WeatherSearchResultInterface extends SearchResultsInterface
{
    /**
     * @return \Orangecat\Weather\Api\Data\WeatherInterface[]
     */
    public function getItems();

    /**
     * @param \Orangecat\Weather\Api\Data\WeatherInterface[] $items
     * @return void
     */
    public function setItems(array $items);
}
