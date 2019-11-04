const updatePublishedToTrue = require('./helpers/updatePublishedToTrue.js');

const updateWeatherPackage = msg => {
  if(!Array.isArray(msg) && msg[0] !== 'WeatherSenderPublished') return;

  const zipCode = msg[1];

  updatePublishedToTrue('weather_packages', zipCode);
}

module.exports = updateWeatherPackage;
