const db = require('../../db/connection.js');

const updatePublishedToTrue = (dbTbl, zipCode) => {
  db(dbTbl)
    .where('zip_code', zipCode)
    .update({ published: true })
    .then(() => console.log(`${zipCode} weather package published=true`))
    .catch(err => console.error('error:', err))
}

module.exports = updatePublishedToTrue;
