//var uuid = require('node-uuid');
var redis = require('../db/redis');
var C = require('../const/const');

var Player = function() {
    this.uid = '001';
    //this.init();
};

Player.prototype.init = function() {
    this.uid = uuid.v1();
};

/**
 * 玩家上线
 */
Player.prototype.online = function() {
    this.addChannel(C.CHANNEL.GLOBAL);
    var fUids = this.getAllFriends();
    for(var i = 0, len = fUids.length; i < len; i++) {
        this.addChannel(fUids[i]);
    }
};

/**
 * 玩家下线
 */
Player.prototype.offline = function() {

};

/**
 * 获取所有好友uid列表
 * @returns {string[]}
 */
Player.prototype.getAllFriends = function() {
    return ['002', '003', '004', '005'];
};

/**
 * 订阅频道
 */
Player.prototype.addChannel = function(channel) {
    if(channel) {
        redis.subscribe(channel);
    }
};

/**
 * 取消频道
 */
Player.prototype.cancelChannel = function(channel) {
    if(channel) {
        redis.unsubscribe(channel);
    }
};

module.exports = function() {
    return new Player();
};