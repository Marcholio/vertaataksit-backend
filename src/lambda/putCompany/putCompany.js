exports.handler = (event, context, callback) => {
  console.log(event);

  var responseBody = {
    key3: 'value3',
    key2: 'value2',
    key1: 'value1',
  };

  var response = {
    statusCode: 200,
    headers: {
      my_header: 'test_value',
    },
    body: JSON.stringify(responseBody),
    isBase64Encoded: false,
  };
  callback(null, response);
};
