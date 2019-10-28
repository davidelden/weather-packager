const createSNSParamsObj = (msg, zipCode) => {
  const snsMsg = Object.values(msg).join(' ');

  const snsParamsObj = {
    "TopicArn": process.env.AWS_SNS_TOPIC_ARN,
    "Message": snsMsg,
    "MessageAttributes": {
      "zip_codes": {
        "DataType": "String",
        "StringValue": zipCode
      }
    }
  }

  return snsParamsObj;
}

module.exports = createSNSParamsObj;
