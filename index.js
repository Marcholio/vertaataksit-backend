require('dotenv').config();

import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-central-1' });
const dbClient = new AWS.DynamoDB.DocumentClient();

const tableNamePrefix = 'VertaaTaksit_';

const params = {
  Item: {
    id: 'testcompany',
    priceClasses: [{ persons: 3, price: 3.4 }, { persons: 4, price: 4 }],
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
