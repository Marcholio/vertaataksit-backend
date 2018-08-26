require('dotenv').config();

import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-central-1' });
const dynamoDB = new AWS.DynamoDB();

const tableNamePrefix = 'VertaaTaksit_';

const params = {
  Item: {
    id: {
      S: 'testcompany',
    },
    priceClasses: {
      L:
      { persons: 2, price: 3.4 },
      { persons: 4, price: 4 }
    }
  },
  TableName: `${tableNamePrefix}Companies`,
};

dynamoDB.putItem(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});
