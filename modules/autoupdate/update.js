//Keeps Libra Up-To-Date (This is temporary till further development is made)
var git = require('gift');
var repo = git('./');
setInterval(function(){
    repo.status(function(err, data){
        //Must be a live instance that needs update check.
        if(data.clean == true){
            repo.pull("origin", "auto-stage", function(err, status, one){

                var spawn = require('child_process').spawn;
                var npminstall = spawn('npm', ['install']);

                /*
                npminstall.stdout.setEncoding('utf8');
                npminstall.stdout.on('data', function(data) {
                    console.log(data)
                });
                */
            });
        }
    });
}, 10000);
