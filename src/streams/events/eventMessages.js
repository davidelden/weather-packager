const dataMessage = zipCode => (
  ['message', 'WeatherPackageAvailable', 'zipcode', zipCode]
);

const errorMessage = errMsg => (
  ['message', 'WeatherPackagerError', 'error', errMsg]
);

const eventMessages = {
  start: ['message', 'WeatherPackagerStart'],
  end: ['message', 'WeatherPackagerEnd'],
  data: dataMessage,
  error: errorMessage
}

module.exports = eventMessages;
