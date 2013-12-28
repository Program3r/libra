var config = require("./config")

var express = require('express');
var io = require('socket.io');
var app = express.createServer(), io = io.listen(app);

var path = require('path'),nexpect = require('nexpect');



app.use('/lib', express.static(__dirname + '/public/libraries'));
app.get('/', function(req, res){
  res.send('<Script src="/lib/clode/clode.js"></script>');
  for(i=0;i<config.routes.length;i++){
     res.send(config.routes[i].page);
  };
});



app.listen(process.env.PORT);

var exec = require('child_process').exec;


io.sockets.on('connection', function (socket) {
    var exec = require('child_process').exec;
    var myObj = {};
    myObj.list = function(callback){
        var result;
        exec("nmap -sP 192.168.1.1/24", function (error, stdout, stderr) {
         callback({id:"id", title:"cloud9", data:stdout.split("\n")});
        });
    }
    myObj.list(function (stdout) {
        socket.emit('scan', stdout);
    });

    socket.on('start', function (data) {
        var myObj2 = {};
        myObj2.list = function(callback){
        }
        myObj2.list(function (stdout) {
            socket.emit('debug', stdout);
        });
    });
        for(i=0;i<config.routes.length;i++){
            app.get('/'+config.routes[i].page, function(req, res){
            	for(j=0;j<config.routes.length;j++){
        			var path = req.route.path;
        			var match = path.substring(path.indexOf('/')+1);
        			if(config.routes[j].page == match){
        			nexpect.spawn(config.routes[j].command, { cwd:config.routes[j].cwd}).run(function (err, out, socket) {
        			});
        			res.send("<script>window.location='http://'+window.location.hostname+':"+config.routes[j].port+"'</script>");
        			}
        		}
        	});
        }
        for(i=0;i<config.startup.length;i++){
            nexpect.spawn(config.routes[i].command, { cwd:config.routes[i].cwd}).run(function (err, out, socket) {});
        }

});
