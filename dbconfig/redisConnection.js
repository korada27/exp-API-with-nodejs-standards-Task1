const redis = require('redis'),
  config = require('config.json')('./config/dbconfig.json');

var redis_client = redis.createClient({host: config.redis.host, port: config.redis.port});

redis_client.on('connect', function () {
  console.log('Connected to redis cache');
});
redis_client.on('error', function () {
  console.log('Some error in connecting the redis cache');
});

module.exports = redis_client;
