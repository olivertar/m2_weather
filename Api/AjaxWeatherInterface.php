<?php
namespace Orangecat\Weather\Api;

interface AjaxWeatherInterface
{
    /**
     * Returns $response
     * @return \Orangecat\Weather\Model\Ajax\AjaxWeatherManagement
     */
    public function getWeather();
}
