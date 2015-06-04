var redis = require('redis');
var client = redis.createClient();

var sub = function() {
    return redis.createClient();
};

client.on('connect', function() {
    console.log('connect redis success !');
});

client.on('error', function() {
    console.log('connect redis error !');
});

module.exports = {
    client: client,
    sub: sub
};
