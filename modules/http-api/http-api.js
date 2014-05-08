var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

//If libra is already running, shut this one down.
server.once('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        process.exit();
    }
});
app.use('/api', express.static(__dirname + '/public'));
server.listen(process.env.PORT || 8383);


libra = {
    "command": {
        "run": function (req) {
            var pty = require('pty.js');
            var term = pty.spawn('bash', [], {
                name: 'xterm-color',
                cols: 80,
                rows: 30,
                cwd: process.env.HOME,
                env: process.env
            });


            //Returns
            var ret = {
                "jsonp": {

                }
            }
            var retf = {
                "jsonp": function (retval) {
                    return req.query.callback + "(" + JSON.stringify(retval) + ")";
                }
            }
            //If we want output
            if (req.query.stdout == 'true') {
                ret["jsonp"]["status"] = "waiting on socket";
                io.sockets.on('connection', function () {});
                io.sockets.on('connection', function (socket) {
                    term.on('data', function (data) {
                        if (socket != undefined) {
                            socket.emit("channel", data);
                        }
                    });
                    //Read List Of Commands Sent Over
                    for (i = 0; i < req.query.sequence.length; i++) {
                        //Runs commands in terminal
                        term.write(req.query.sequence[i] + "\r");
                    }
                    ret["jsonp"]["status"] = "running on socket";
                });
                ret["jsonp"]["stdout"] = "channel";
            }
            else {
                ret["jsonp"]["status"] = "running";
                //Read List Of Commands Sent Over
                for (i = 0; i < req.query.sequence.length; i++) {
                    //Runs commands in terminal
                    term.write(req.query.sequence[i] + "\r");
                }
            }
            return retf[req.params.format](ret[req.params.format]);

        },
        "settings": {
            "environment": "client"
        }
    },
    "startservice": {
        "run": function (options) {
            if (options.type == undefined) {

            }
        }
    },
    "checkrunning": {
        "run": function (options) {
            var net = require('net');
            var S = new net.Socket();
            S.connect(options.port, '127.0.0.1');
            S.on('connect',function(){
                options.status = "closed"
                S.end();
                options.callback(options);
            });
            S.on('error',function(){
                options.status = "open"
                S.end();
                options.callback(options);
            });

        }
    }
}



app.get('/api/:code/:mode/:format', function (req, res) {
    var params = req.params;
    if (libra[params.code] != undefined) {
        if (typeof libra[params.code][params.mode] == "function") {
            res.send(libra[params.code][params.mode](req));
        }
        else if (libra[params.code][params.mode] != undefined) {
            res.send(libra[params.code][params.mode]);
        }
        else {
            res.send("Invalid API Call. '<b>" + params.mode + "</b>' does not exist in '<b>" + params.code + "</b>'.")
        }
    }
    else {
        res.send("Invalid API Call. '<b>" + params.code + "</b>' does not exist in Libra.");
    }
});
