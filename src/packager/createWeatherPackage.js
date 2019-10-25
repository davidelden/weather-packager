const fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      weatherAPIEndpoint = require('../fetch/helpers/weatherAPIEndpoint.js'),
      saveWeatherPackage = require('./helpers/saveWeatherPackage.js'),
      interpretWeatherData = require('./helpers/interpretWeatherData.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const createWeatherPackage = async msg => {
    if(!Array.isArray(msg) || msg[1] !== 'WeatherFetchDataAvailable') return;

    writeStream(streamName, eventMessages['start']);

    const zipCode = msg[3],
          endPoint = weatherAPIEndpoint(zipCode),
          weatherData = await fetchFromAPI(endPoint); // Fetch weather

    // Interpret weather data
    interpretWeatherData(weatherData);

    // Create message to send to AWS SNS
    // saveWeatherPackage() <--- need to build this out

    writeStream(streamName, eventMessages['end']);
}

module.exports = createWeatherPackage;
