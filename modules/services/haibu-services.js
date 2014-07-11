var d = require('detectionizr')
function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
//Check if Haibu module is installed
if (d.detect(["haibu"])["haibu"]) {
    var fs = require("fs");

    var settings = {
        "service_dir": __dirname + "/../../services"
    }
    //Read services directory for files.
    fs.readdir(settings["service_dir"], function (err, files) {
        if (files != undefined) {
            for (i = 0; i < files.length; i++) {
                //Check if it's a JSON file
                if (files[i].indexOf('.json') > -1) {
                    fs.readFile(settings["service_dir"] + "/" + files[i], {
                        encoding: "utf8"
                    }, function (err, data) {
                        //Attempt to parse it as JSON.
                        try {
                            var serviceInfo = JSON.parse(data);

                            //Use Haibu
                            if (serviceInfo.type == "haibu") {
                                var eyes = require('eyes'),
                                    haibu = require('haibu');

                                var client = new haibu.drone.Client({
                                    host: 'localhost',
                                    port: 9002
                                });
                                client.start(serviceInfo, function (err, result) {
                                    if (err) {
                                        console.log('Error spawning app: ' + serviceInfo.name);
                                        return eyes.inspect(err);
                                    }

                                    console.log('Successfully spawned app:');
                                    eyes.inspect(result);
                                });
                            }else if(serviceInfo.type == "forever-monitor"){
                                //Use Foever / Forever-Monitor

                                var forever = require('forever-monitor');

                                var child = new (forever.Monitor)(serviceInfo.repository.directory+"/"+serviceInfo.scripts.start, serviceInfo);
                                child.on('exit', function () {
                                    //console.log(serviceInfo.file + ' has exited after ' + serviceInfo.max + ' restarts');
                                });
                                child.on('stdout', function (data) {
                                    var buf = new Buffer(data);
                                    //console.log(buf.toString("utf8"));
                                });
                                child.on('stderr', function (data) {
                                    var buf = new Buffer(data);
                                    //console.log(buf.toString("utf8"));
                                });
                                child.on('start', function (process, data) {
                                    var buf = new Buffer(data);
                                    //console.log(buf.toString("utf8"));
                                });
                                child.on('error', function (process, data) {
                                    var buf = new Buffer(data);
                                    //console.log(buf.toString("utf8"));
                                });
                                child.start();

                            }
                        }
                        catch (e) {
                        }
                    });
                }
            }
        }
    });
}