const http = require('http'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const weatherFetchServiceApiUrl = zipCode => {
  return process.env.WEATHER_FETCH_SERVICE_API_BASE_URL + `${zipCode}?key=${process.env.WEATHER_FETCH_SERVICE_API_KEY}`;
}

const fetchWeatherData = msg => {
  if(!Array.isArray(msg) || msg[0] !== 'WeatherFetchDataAvailable') return;

  writeStream(streamName, eventMessages['start']);

  const zipCode = msg[1],
        endPoint = weatherFetchServiceApiUrl(zipCode);

  fetchFromAPI(endPoint, 'some_table', zipCode); // Update with real db table

  writeStream(streamName, eventMessages['end']);
}

const fetchFromAPI = (url, dbTbl, zipCode) => {
  http.get(url, res => {
    const { statusCode } = res,
          contentType = res.headers['content-type'];

    let error,
        rawData = '';

    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }

    if (error) {
      writeStream(streamName, eventMessages['error'](error);
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData),
              weatherData = { ...parsedData[0]['data'] };

        console.log('[fetchFromAPI]', weatherData);
        // saveWeatherPackage(dbTbl, zipCode, ...weatherData);
      } catch (err) {
        writeStream(streamName, eventMessages['error'](err);
        console.error(err.message);
      }
    });
  })
  .on('error', err => {
    writeStream(streamName, eventMessages['error'](err);
    console.error(`http.get received an error: ${err.message}`);
  });
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
