const interpretWeatherData = data => {
  const interpretedWeather = {},
        { current_temp, high_temp, pop, precip, snow } = data,
        forecast_description = data['weather']['description'].toLowerCase();

  interpretedWeather.current_temp = current_temp;
  interpretedWeather.chance_of_precipitation = pop;
  interpretedWeather.rain_amount = precip;
  interpretedWeather.snow_amount = snow;
  interpretedWeather.forecast_description = forecast_description;
  interpretedWeather.high_temp = high_temp;

  console.log('interpretedWeather', interpretedWeather);
}

module.exports = interpretWeatherData;
