var fs = require("fs");

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
fs.readdir("./services", function (err, files) {
    for (i = 0; i < files.length; i++) {
        if (files[i].indexOf('.json') > -1) {
            fs.readFile('./services/' + files[i], {
                encoding: "utf8"
            }, function (err, data) {


                try {
                    var serviceInfo = JSON.parse(data);
                    if (serviceInfo.type != undefined) {
                        if (serviceInfo.type == "forever") {
                            var forever = require('forever-monitor');
                            //Like jquery.extend
                            var childOptions = jsonConcat({
                                max: 3,
                                silent: true,
                                options: []
                            }, serviceInfo);
                            var child = new(forever.Monitor)(childOptions.file, childOptions);
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
                }
                catch (e) {
                }
            });
        }
    }
});