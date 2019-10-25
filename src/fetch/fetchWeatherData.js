const fetchFromAPI = require('./helpers/fetchFromAPI.js'),
      weatherAPIEndpoint = require('./helpers/weatherAPIEndpoint.js'),
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
    //   // fn to save message to db
    // })
    .catch(err => console.error(err));

  writeStream(streamName, eventMessages['end']);
}

const saveWeatherPackage = (dbTbl, zipCode, data) => {
  db(dbTbl)
    .where({ zip_code: zipCode })
    .update({ data: data, updated_at: db.fn.now() })
    .then(() => {
      writeStream(streamName, eventMessages['data'](zipCode));
      console.log(`${dbTbl} updated with ${zipCode} weather package`);
    })
    .catch(err => {
      writeStream(streamName, eventMessages['error'](err));
      console.error('error:', err);
    })
}

module.exports = fetchWeatherData;
