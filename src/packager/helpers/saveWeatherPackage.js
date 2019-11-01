const util = require('util'),
      db = require('../../db/connection.js'),
      writeStream = require('../../streams/actions/writeStream.js'),
      eventMessages = require('../../streams/events/eventMessages.js'),
      streamName = 'WeatherPackage';

const saveWeatherPackage = async (dbTbl, zipCode, data) => {
  const insert = db(dbTbl)
    .insert({ zip_code: zipCode, message: JSON.stringify(data) })
    .toString()

  const update = db(dbTbl)
    .update({ message: JSON.stringify(data), published: false, updated_at: db.fn.now() })
    .whereRaw(`${dbTbl}.zip_code = ?`, [zipCode])

  const query = util.format(
    '%s ON CONFLICT (zip_code) DO UPDATE SET %s',
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, '')
  )

  db.raw(query)
    .then(() => {
      writeStream(streamName, eventMessages['data'](zipCode));
      console.log(`${dbTbl} updated with ${zipCode} weather package`);
    })
    .catch(err => {
      writeStream(streamName, eventMessages['error'](err));
      console.error('error:', err);
    })
}

module.exports = saveWeatherPackage;
