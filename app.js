var redis = require('./db/redis');
var Player = require('./domain/player');

var player = Player();
player.online();

console.log(player);
