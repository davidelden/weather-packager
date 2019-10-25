const http = require('http'),
      writeStream = require('../../streams/actions/writeStream.js'),
      eventMessages = require('../../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const fetchFromAPI = url => {
  return new Promise((resolve, reject) => {
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
        writeStream(streamName, eventMessages['error'](error));
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

          resolve(weatherData);
        } catch (err) {
          writeStream(streamName, eventMessages['error'](err));
          console.error(err.message);
          reject(err);
        }
      });
    })
    .on('error', err => {
      writeStream(streamName, eventMessages['error'](err));
      console.error(`http.get received an error: ${err.message}`);
      reject(err);
    });
  });
}

module.exports = fetchFromAPI;
