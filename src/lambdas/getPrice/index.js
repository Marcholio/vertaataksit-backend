import GoogleMaps from '@google/maps';

exports.handler = (event, context, callback) => {
  const googleClient = GoogleMaps.createClient({
    key: 'AIzaSyAwhWuDLYC3VzSl9IZ7VpiZs0Vx__iky7c',
  });
  if (!event.body) {
    callback(null, { statusCode: 500, body: 'Missing request body' });
  } else {
    const payload = JSON.parse(event.body);
    if (!payload.from || !payload.to) {
      callback(null, { statusCode: 500, body: 'Missing from or to' });
    } else {
      googleClient.distanceMatrix(
        {
          origins: [payload.from],
          destinations: [payload.to],
          units: 'metric',
        },
        (err, data) => {
          if (err) {
            callback(null, {
              statusCode: 500,
              body: 'An exception occurred in Google Directions API',
            });
            console.log(err);
          } else {
            console.log(data);
          }
        },
      );
      callback(null, { statusCode: 200, body: 'OK' });
    }
  }
};
