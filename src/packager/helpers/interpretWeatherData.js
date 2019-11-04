// Weather codes/descriptions https://www.weatherbit.io/api/codes

const interpretWeatherData = data => {
  const  msgBuilder = {},
         { current_temp,
           high_temp,
           pop,
           city_name,
           state_code } = data,
         { description, code } = data['weather'];

  msgBuilder.currentTemp = `Currently it's ${current_temp}F in ${city_name}, ${state_code}.`;
  msgBuilder.forecast = `Forecast: ${description.toLowerCase()} with a ${pop}% chance of precipitation.`;
  msgBuilder.highTemp = `High temp: ${high_temp}F.`;

  return msgBuilder;
}

module.exports = interpretWeatherData;
