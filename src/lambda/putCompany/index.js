import AWS from 'aws-sdk';

exports.handler = (event, context, callback) => {
  console.log(event);

  AWS.config.update({ region: 'eu-central-1' });
  const dbClient = new AWS.DynamoDB.DocumentClient();

  const tableNamePrefix = 'VertaaTaksit_';

  const params = {
    Item: {
      id: 'testcompany',
      priceClasses: [{ persons: 3, price: 3.5 }, { persons: 4, price: 4 }],
    },
    TableName: `${tableNamePrefix}Companies`,
  };

  dbClient.put(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });

  var responseBody = {
    key3: 'value3',
    key2: 'value2',
    key1: 'value1',
  };

  var response = {
    statusCode: 200,
    headers: {
      my_header: 'test_value2',
    },
    body: JSON.stringify(responseBody),
    isBase64Encoded: false,
  };
  callback(null, response);
};
