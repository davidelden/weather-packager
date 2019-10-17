const readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter'),
      streamName = 'WeatherFetch';

readStream(streamName);
msgEmitter.on('streamMessage', msg => console.log('[WeatherPackager]', msg));
