var config = require("./config")

var express = require('express');
var io = require('socket.io');
var app = express.createServer()
  , io = io.listen(app);

 
var path = require('path'),
    nexpect = require('nexpect');

for(i=0;i<config.startup.length;i++){
    nexpect.spawn(config.startup[i].command, { cwd:config.startup[i].cwd}).run(function (err, out) {  
    });
}

app.use('/lib', express.static(__dirname + '/public/libraries'));
app.get('/', function(req, res){
  res.send('<Script src="/lib/clode/clode.js"></script>');
});
app.listen(8082);

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

  
  
  /*socket.on('my other event', function (data) {
    console.log(data);
  });*/
});

//Fiber(function() {
/*
    var exec = require('child_process').exec;
    var child;
    child = exec("cd ~/projects/CanVerse && meteor", function (error, stdout, stderr) {
        console.log(stdout);
        if (error !== null) {
        //console.log('exec error: ' + error);
        }
    });
//}).run();
*/
