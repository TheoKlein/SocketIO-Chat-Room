var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');

var onlineUser = 0;
var type = {
    'guest': '訪客',
    'loser': '魯蛇',
    'fat': '肥宅',
    'hands': '左右手',
    'liver': '月干',
    'magic': '魔法師',
    'mei': '小妹',
    'pm': 'PM',
    'boss': '慣老闆',
    'yee': 'YEE龍',
    'beauty': '正妹工程師',
    'bird': '菜鳥工程師',
    'senpai': '資深工程師',
    'anonymous': '匿名者',
    'edgeman': '資工邊緣人',
    'bigboss': '版主'
}

app.use(express.static("public"));

io.on('connection', function (socket) {
    /**
     * Send online user's number when anyone connect.
     */
    onlineUser += 1;
    io.emit('chat message', getMsg({
        avatar: 'bigboss',
        meta: '系統訊息',
        msg: '目前線上人數：' + onlineUser + '人'
    }));

    /**
     * Send online user's number when anyone disconnect.
     */
    socket.on('disconnect', function () {
        onlineUser -= 1;
        io.emit('chat message', getMsg({
            avatar: 'bigboss',
            meta: '系統訊息',
            msg: '目前線上人數：' + onlineUser + '人'
        }));
    });

    /**
     *  Get message from client and send to everyone.
     */
    socket.on('chat message', function (data) {
        data.msg = check(data.user, data.msg);
        msg = getMsg({
            avatar: data.user,
            meta: data.date + ' ' + data.time,
            msg: data.msg
        });

        /**
         * MISSING CODE BELOW HERE
         *
         * Event: 'chat message'
         * Send Content: msg
         */
        io.emit('', );
    });
});

http.listen(8080, function () {
    console.log("Your IP address is " + ip.address());
    console.log('Server is now listening on 8080 port.');
});


function check(type, msg) {
    var s = msg;
    if (type == "liver" || type == "yee") {
        s = "";
        for (var i = 0; i < msg.length; i++) {
            if (type == "liver")
                s += "...";
            else if (type == "yee")
                s += "YEE~";
        }
    }
    return s;
}

function getMsg(data) {
    var s = "<div class='comment'>\
                <a class='avatar'>\
                    <img src='asset/avatar/" + data.avatar + ".jpg'>\
                </a>\
            <div class='content'>\
                <a class='author'>" + type[data.avatar] + "</a>\
                <div class='metadata'>\
                    <span class='date'>" + data.meta + "</span>\
                </div>\
                    <div class='text'>\
                        <p>" + data.msg + "</p>\
                    </div>\
                </div>\
            </div>";
    return s;
}
