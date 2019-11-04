require('dotenv').config();

const migrateLatest = require('./src/db/migrateLatest.js'),
      readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      createWeatherPackage = require('./src/packager/createWeatherPackage.js'),
      startServer = require('./src/api/server.js'),
      streamWeatherFetch = 'WeatherFetch',
      streamWeatherSender = 'WeatherSender';

migrateLatest();
readStream(streamWeatherFetch);
readStream(streamWeatherSender);
msgEmitter.on('streamMessage', msg => createWeatherPackage(msg));
startServer();
