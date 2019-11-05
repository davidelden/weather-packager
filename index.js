require('dotenv').config();

const migrateLatest = require('./src/db/migrateLatest.js'),
      readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      createWeatherPackage = require('./src/packager/createWeatherPackage.js'),
      updateWeatherPackage = require('./src/packager/updateWeatherPackage.js'),
      startServer = require('./src/api/server.js');

migrateLatest();
readStream([['WeatherFetch', '$'], ['WeatherSender', '$']]);
startServer();

msgEmitter.on('streamMessage', msg => {
  createWeatherPackage(msg);
  updateWeatherPackage(msg);
});
