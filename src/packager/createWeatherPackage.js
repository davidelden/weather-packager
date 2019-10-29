const fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      weatherAPIEndpoint = require('../fetch/helpers/weatherAPIEndpoint.js'),
      saveWeatherPackage = require('./helpers/saveWeatherPackage.js'),
      interpretWeatherData = require('./helpers/interpretWeatherData.js'),
      createSNSParamsObj = require('./helpers/createSNSParamsObj.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const createWeatherPackage = async msg => {
    if(!Array.isArray(msg) || msg[1] !== 'WeatherFetchDataAvailable') return;

    writeStream(streamName, eventMessages['start']);

    const zipCode = msg[3],
          endPoint = weatherAPIEndpoint(zipCode),
          weatherData = await fetchFromAPI(endPoint), // Fetch weather
          weatherMsg = interpretWeatherData(weatherData); // Interpret weather data
          snsParams = createSNSParamsObj(weatherMsg, zipCode); // Create message to send to AWS SNS

    saveWeatherPackage('weather_packages', zipCode, snsParams);

    writeStream(streamName, eventMessages['end']);
}

module.exports = createWeatherPackage;
