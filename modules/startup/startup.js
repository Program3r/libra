var config = require("../../config.js");
var collection = db.collection("startup.json");


function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}


for (i = 0; i < config.startup.length; i++) {
    config.startup[i].callback = function (data) {
        if (data.status == "open") {
            if (data.type != undefined) {
                if (data.type == "forever") {
                    var forever = require('forever-monitor');
                    //Like jquery.extend
                    var childOptions = jsonConcat({
                        max: 3,
                        silent: true,
                        options: []
                    }, data);
                    var child = new(forever.Monitor)(data.file, childOptions);
                    child.on('exit', function () {
                        console.log(childOptions.file + ' has exited after ' + childOptions.max + ' restarts');
                    });
                    child.on('stdout', function (data) {
                        var buf = new Buffer(data);
                        console.log(buf.toString("utf8"));
                    });
                    child.on('stderr', function (data) {
                        var buf = new Buffer(data);
                        console.log(buf.toString("utf8"));
                    });
                    child.on('start', function (process, data) {
                        var buf = new Buffer(data);
                        console.log(buf.toString("utf8"));
                    });
                    child.start();

                }

            }
            else {
                if (data.status == "open") {
                    var childProcess = require('child_process'),
                        ls;
                    ls = childProcess.exec(data.command, function (error, stdout, stderr) {
                        if (error) {
                            console.log(error.stack);
                            console.log('Error code: ' + error.code);
                            console.log('Signal received: ' + error.signal);
                        }
                        console.log('Child Process STDOUT: ' + stdout);
                        console.log('Child Process STDERR: ' + stderr);
                    });

                    ls.on('exit', function (code) {
                        console.log('Child process exited with exit code ' + code);
                    });
                }
            }
        }
    }
    libra.checkrunning.run(config.startup[i]);
}
