'use strict';

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

_awsSdk2.default.config.update({ region: 'eu-central-1' });
var dbClient = new _awsSdk2.default.DynamoDB.DocumentClient();

var tableNamePrefix = 'VertaaTaksit_';

var params = {
  Item: {
    id: 'testcompany',
    priceClasses: [{ persons: 3, price: 3.4 }, { persons: 4, price: 4 }]
  },
  TableName: tableNamePrefix + 'Companies'
};

dbClient.put(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});