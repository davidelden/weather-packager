const createWeatherPackage = weatherData => {
  // Interpret weather data
  // Create message to send to AWS SNS
  // Return packaged message
}

const createWeatherMessage = (msg, zipCode) => {
  const weatherMsg = {
    "TopicArn": process.env.AWS_SNS_TOPIC_ARN,
    "Message": msg,
    "MessageAttributes": {
      "zip_codes": {
        "DataType": "String",
        "StringValue": zipCode
      }
    }
  }
}

module.exports = createWeatherPackage;
