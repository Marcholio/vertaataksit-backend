import AWS from 'aws-sdk';

exports.handler = (event, context, callback) => {
  AWS.config.update({ region: 'eu-central-1' });
  const dbClient = new AWS.DynamoDB.DocumentClient();

  const tableNamePrefix = 'VertaaTaksit_';

  const params = {
    Item: {
      event,
    },
    TableName: `${tableNamePrefix}Companies`,
  };

  dbClient.put(params, err => {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: 'An exception occurred',
      });
      console.log(err, err.stack);
    } else {
      callback(null, {
        statusCode: 200,
        body: '',
      });
    }
  });
};
