require('dotenv').config();

const readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      fetchWeatherData = require('./src/fetch/fetchWeatherData.js'),
      streamName = 'WeatherFetch';

readStream(streamName);
msgEmitter.on('streamMessage', msg => fetchWeatherData(msg));
