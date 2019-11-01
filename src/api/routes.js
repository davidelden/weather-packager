const express = require('express'),
      db = require('../db/connection.js'),
      middleWare = require('./middleware.js'),
      router = express.Router();

router.get('/api/v1/weather-package/:zip_code', middleWare.checkAPIKey, (req, res) => {
  db.select('message')
    .from('weather_packages')
    .where({ zip_code: req.params.zip_code })
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;
