const fetchFromAPI = require('./helpers/fetchFromAPI.js'),
      weatherAPIEndpoint = require('./helpers/weatherAPIEndpoint.js'),
      saveWeatherPackage = require('./helpers/saveWeatherPackage.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const fetchWeatherData = msg => {
  if(!Array.isArray(msg) || msg[1] !== 'WeatherFetchDataAvailable') return;

  writeStream(streamName, eventMessages['start']);

  const zipCode = msg[3],
        endPoint = weatherAPIEndpoint(zipCode);

  fetchFromAPI(endPoint)
    .then(data => console.log(data))
    // .then(data => {
    //   // fn to interpret data and create message
    // })
    // .then(message => {
    //   // saveWeatherPackage()
    // })
    .catch(err => console.error(err));

  writeStream(streamName, eventMessages['end']);
}

module.exports = fetchWeatherData;
