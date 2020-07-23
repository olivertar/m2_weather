<?php
namespace Orangecat\Weather\Api;

use Magento\Framework\Api\SearchCriteriaInterface;
use Orangecat\Weather\Api\Data\WeatherInterface;

interface WeatherRepositoryInterface
{
    /**
     * @param int $id
     * @return \Orangecat\Weather\Api\Data\WeatherInterface
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    public function getById($id);

    /**
     * @param \Orangecat\Weather\Api\Data\WeatherInterface $weather
     * @return \Orangecat\Weather\Api\Data\WeatherInterface
     */
    public function save(WeatherInterface $weather);

    /**
     * @param \Orangecat\Weather\Api\Data\WeatherInterface $weather
     * @return void
     */
    public function delete(WeatherInterface $weather);

    /**
     * @param \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
     * @return \Orangecat\Weather\Api\Data\WeatherSearchResultInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria);
}
