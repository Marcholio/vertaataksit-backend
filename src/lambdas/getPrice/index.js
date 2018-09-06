import GoogleMaps from '@google/maps';
import AWS from 'aws-sdk';

const tableNamePrefix = 'VertaaTaksit_';

const getCompanies = () =>
  new Promise((resolve, reject) => {
    AWS.config.update({ region: 'eu-central-1' });
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: `${tableNamePrefix}Companies`,
    };
    dbClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });

const calculatePrice = (company, distance) => {
  const startPrice = parseFloat(company.startPrice) || 0;
  const pricePerKm = company.price || 0;
  return startPrice + pricePerKm * distance;
};

exports.handler = (event, context, callback) => {
  const googleClient = GoogleMaps.createClient({
    key: 'AIzaSyAwhWuDLYC3VzSl9IZ7VpiZs0Vx__iky7c',
  });
  if (!event.queryStringParameters) {
    callback(null, { statusCode: 500, body: 'Missing query string params' });
  } else {
    const payload = event.queryStringParameters;
    if (!payload.from || !payload.to) {
      callback(null, { statusCode: 500, body: 'Missing from or to' });
    } else {
      googleClient.distanceMatrix(
        {
          origins: [payload.from],
          destinations: [payload.to],
        },
        (err, data) => {
          if (err) {
            console.log(err);
            callback(null, {
              statusCode: 500,
              body: 'An exception occurred in Google Directions API',
            });
          } else {
            const status = data.json.rows[0].elements[0].status;
            if (status === 'NOT_FOUND') {
              callback(null, { statusCode: 404, body: 'Not found' });
            } else {
              const distance =
                data.json.rows[0].elements[0].distance.value / 1000;

              getCompanies()
                .then(companies => {
                  callback(null, {
                    statusCode: 200,
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({
                      prices: companies
                        .map(c => ({
                          company: c.companyName,
                          price: calculatePrice(c, distance),
                        }))
                        .sort((a, b) => a.price - b.price),
                    }),
                  });
                })
                .catch(err => {
                  console.log(err);
                  callback(null, {
                    statusCode: 500,
                    body: 'An exception occurred in Company DB',
                  });
                });
            }
          }
        },
      );
    }
  }
};
