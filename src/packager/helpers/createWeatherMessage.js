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

module.exports = createWeatherMessage;
