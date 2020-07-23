<?php
namespace Orangecat\Weather\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface WeatherInterface extends ExtensibleDataInterface
{
    const ID         = 'weather_id';
    const CITY       = 'city';
    const JSONDATA   = 'jsondata';
    const CREATED_AT = 'created_at';

    /**
     * @return int
     */
    public function getWeatherId();

    /**
     * @param int $id
     * @return void
     */
    public function setWeatherId($id);

    /**
     * @return string
     */
    public function getCity();

    /**
     * @param string $city
     * @return void
     */
    public function setCity($city);

    /**
     * @return string
     */
    public function getJsondata();

    /**
     * @param string $jsondata
     * @return void
     */
    public function setJsondata($jsondata);

    /**
     * @return string
     */
    public function getCreatedAt();

    /**
     * @param string $date
     * @return void
     */
    public function setCreatedAt($date);
}
