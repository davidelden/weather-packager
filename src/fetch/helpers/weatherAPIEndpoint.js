const weatherAPIEndpoint = zipCode => {
  return process.env.WEATHER_FETCH_SERVICE_API_BASE_URL + `${zipCode}?key=${process.env.WEATHER_FETCH_SERVICE_API_KEY}`;
}

module.exports = weatherAPIEndpoint;
