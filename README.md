# M2 Open Weather API sample Module

This module has been developed for Magento 2.3.5

The purpose of this module is to show a weather forecast for the next 5 days that shows the wind conditions from the final user location, with also the temperature and forecast, as all basic conditions they will need.

## Installation

The extension must be installed via `composer`. To proceed, run these commands in your terminal:

```
composer require orangecat/weather
php bin/magento module:enable Orangecat_Weather
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```

## Screenshot
![ScreenShot](https://github.com/olivertar/m2_weather/blob/master/screen-shot/weather_settings.png)
