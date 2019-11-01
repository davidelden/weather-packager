require('dotenv').config();

const migrateLatest = require('./src/db/migrateLatest.js'),
      readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      createWeatherPackage = require('./src/packager/createWeatherPackage.js'),
      startServer = require('./src/api/server.js'),
      streamName = 'WeatherFetch';

migrateLatest();
readStream(streamName);
msgEmitter.on('streamMessage', msg => createWeatherPackage(msg));
startServer();
