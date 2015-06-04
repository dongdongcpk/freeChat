var redis = require('../db/redis');
var client = redis.client;
var C = require('../const/const');

var Player = function() {
    this.uid = '001';
    this.channel = {};
    this.init();
};

Player.prototype.init = function() {
    this.sub = redis.sub();
};

Player.sub.on('subscribe', function(channel, count) {
    console.log('subscribe: ', channel, count);
});

Player.sub.on('message', function(channel, message) {
    console.log('channel: ' + channel + ': ' + message);
});

/**
 * 玩家上线
 */
Player.prototype.online = function() {
    this.addChannel(C.CHANNEL.GLOBAL);
    var fUids = this.getAllFriends();
    for(var i = 0, len = fUids.length; i < len; i++) {
        var channelTo = this.uid + ':' + fUids[i]; // as follow: '001:002'
        var channelFrom = fUids[i] + ':' + this.uid; // as follow: '002:001'
        this.bindChannel(channelTo, fUids[i]);
        this.addChannel(channelFrom);
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
    //todo return real friends
    if(this.uid === '001') {
        return ['002', '003', '004', '005'];
    }
    if(this.uid === '002') {
        return ['001', '003', '004', '005'];
    }
};

/**
 * 订阅频道
 */
Player.prototype.addChannel = function(channel) {
    if(channel && !!this.sub) {
        this.sub.subscribe(channel);
    }
};

/**
 * 取消频道
 */
Player.prototype.cancelChannel = function(channel) {
    if(channel && !!this.sub) {
        this.sub.unsubscribe(channel);
    }
};

Player.prototype.bindChannel = function(channel, uid) {
    this.channel[uid] = channel;
};

/**
 * 发送消息
 */
Player.prototype.sendMsg = function(uid, msg) {
    if(!!msg) {
        var channel = this.channel[uid];
        if(channel) {
            client.publish(channel, msg);
        }
    }
};

Player.prototype.sendGlobalMsg = function(msg) {
    if(!!msg) {
        client.publish(C.CHANNEL.GLOBAL, msg);
    }
};

module.exports = function() {
    return new Player();
};