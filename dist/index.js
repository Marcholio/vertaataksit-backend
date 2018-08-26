'use strict';

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

_awsSdk2.default.config.update({ region: 'eu-central-1' });
var dynamoDB = new _awsSdk2.default.DynamoDB();

var tableNamePrefix = 'VertaaTaksit_';

var params = {
  Item: {
    id: {
      S: 'testcompany'
    },
    priceClass1: { persons: 2, price: 3.4 },
    priceClass2: { persons: 4, price: 4 }
  },
  TableName: tableNamePrefix + 'Companies'
};

dynamoDB.putItem(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});