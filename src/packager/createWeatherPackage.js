const fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      weatherAPIEndpoint = require('../fetch/helpers/weatherAPIEndpoint.js'),
      saveWeatherPackage = require('./helpers/saveWeatherPackage.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const createWeatherPackage = async msg => {
    if(!Array.isArray(msg) || msg[1] !== 'WeatherFetchDataAvailable') return;

    writeStream(streamName, eventMessages['start']);

    const zipCode = msg[3],
          endPoint = weatherAPIEndpoint(zipCode),
          weatherData = await fetchFromAPI(endPoint);

    // Fetch weather
    console.log('weatherData', weatherData);

    // Interpret weather data
    // Create message to send to AWS SNS
    // Return packaged message

    writeStream(streamName, eventMessages['end']);
}

module.exports = createWeatherPackage;
