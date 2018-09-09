import AWS from 'aws-sdk';
import { sha512 } from 'js-sha512';

exports.handler = (event, context, callback) => {
  AWS.config.update({ region: 'eu-central-1' });
  const dbClient = new AWS.DynamoDB.DocumentClient();

  const tableNamePrefix = 'VertaaTaksit_';

  if (!event.username || !event.password) {
    callback(null, { statusCode: 500, body: 'Missing username or password' });
  } else {
    const params = {
      Key: {
        username: event.username,
      },
      TableName: `${tableNamePrefix}Users`,
    };

    dbClient.get(params, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: 'An exception occurred',
        });
        console.log(err, err.stack);
      } else {
        const password = sha512(event.password);
        if (password === data.Item.password) {
          callback(null, {
            statusCode: 200,
            body: 'OK',
          });
        } else {
          callback(null, {
            statusCode: 403,
            body: 'Forbidden',
          });
        }
      }
    });
  }
};
