const redis = require('redis'),
      client = redis.createClient({ host: 'redis' }),
      msgEmitter = require('../../emitter/msgEmitter.js');

const readStreams = (streamInfoArr, timeout = '0') => {
  const streamNames = streamInfoArr.map(stream => stream[0]),
        elemIds = streamInfoArr.map(stream => stream[1]),
        streamInfoArrCopy = [ ...streamInfoArr ];

  client.xread(['COUNT', '1', 'BLOCK', timeout, 'STREAMS', ...streamNames, ...elemIds], (err, stream) => {
    if (err) return console.error('Error reading from stream:', err);

    if(stream) {
      for(arr of stream) {
        let streamName = arr[0],
            streamNameIndex = streamNames.indexOf(streamName),
            elemId = arr[1][0][0],
            streamArr = [ ...arr[1][0][1] ],
            msgIndex = streamArr.indexOf('message') + 1,
            zipCodeIndex = streamArr.indexOf('zipcode'),
            msg = streamArr[msgIndex];

        if(zipCodeIndex !== -1) {
          let zipCode = streamArr[zipCodeIndex+1];

          msgEmitter.emit('streamMessage', [msg, zipCode]);
        } else {
          msgEmitter.emit('streamMessage', msg);
        }

        streamInfoArrCopy[streamNameIndex][1] = elemId;
      }
    }

    readStreams(streamInfoArrCopy);
  });
}

module.exports = readStreams;
