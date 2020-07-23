<?php
namespace Orangecat\Weather\Model;

use Orangecat\Weather\Api\WeatherRepositoryInterface;
use Orangecat\Weather\Api\Data\WeatherInterface;
use Orangecat\Weather\Api\Data\WeatherSearchResultInterface;
use Orangecat\Weather\Api\Data\WeatherSearchResultInterfaceFactory;
use Orangecat\Weather\Model\ResourceModel\Weather\CollectionFactory as WeatherCollectionFactory;
use Orangecat\Weather\Model\ResourceModel\Weather\Collection;
use Orangecat\Weather\Model\ResourceModel\Weather as WeatherResource;
use Orangecat\Weather\Model\WeatherFactory as WeatherFactory;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SortOrder;
use Magento\Framework\Exception\NoSuchEntityException;

class WeatherRepository implements WeatherRepositoryInterface
{
    private $weatherFactory;

    private $weatherCollectionFactory;

    private $searchResultFactory;

    private $collectionProcessor;

    public function __construct(
        WeatherFactory $weatherFactory,
        WeatherCollectionFactory $weatherCollectionFactory,
        WeatherSearchResultInterfaceFactory $weatherSearchResultInterfaceFactory,
        CollectionProcessorInterface $collectionProcessor,
        WeatherResource $weatherResource
    ) {
        $this->weatherFactory = $weatherFactory;
        $this->weatherCollectionFactory = $weatherCollectionFactory;
        $this->searchResultFactory = $weatherSearchResultInterfaceFactory;
        $this->collectionProcessor = $collectionProcessor;
        $this->weatherResource = $weatherResource;
    }

    public function getById($id)
    {
        if (!isset($this->_instances[$id])) {
            $weather = $this->weatherFactory->create();
            $this->weatherResource->load($weather, $id);
            if (!$weather->getId()) {
                throw new NoSuchEntityException(__('Weather does not exist'));
            }
            $this->instances[$id] = $weather;
        }

        return $this->instances[$id];
    }

    public function save(WeatherInterface $weather)
    {
        try {
            $this->weatherResource->save($weather);
        } catch (Exception $exception) {
            throw new CouldNotSaveException(__('Could not save the weather: %1', $exception->getMessage()));
        }

        return $weather;
    }

    public function delete(WeatherInterface $weather)
    {
        $id = $weather->getId();
        try {
            unset($this->instances[$id]);
            $this->weatherResource->delete($weather);
        } catch (Exception $e) {
            throw new StateException(__('Unable to remove weather %1', $id));
        }
        unset($this->instances[$id]);

        return true;
    }

    public function getList(SearchCriteriaInterface $searchCriteria)
    {
        $collection = $this->weatherCollectionFactory->create();
        $this->collectionProcessor->process($searchCriteria, $collection);
        $searchResults = $this->searchResultFactory->create();
        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        return $searchResults;
    }
}
