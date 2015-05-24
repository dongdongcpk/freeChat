var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connect redis success !');
});

client.on('error', function() {
    console.log('connect redis error !');
});

client.on('subscribe', function(channel, count) {
    console.log(channel, count);
});

client.on('message', function(channel, message) {
    console.log('channel ' + channel + ': ' + message);
});

module.exports = client;
