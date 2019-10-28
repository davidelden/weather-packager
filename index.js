require('dotenv').config();

const readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      createWeatherPackage = require('./src/packager/createWeatherPackage.js'),
      streamName = 'WeatherFetch';

readStream(streamName);
msgEmitter.on('streamMessage', msg => createWeatherPackage(msg));
