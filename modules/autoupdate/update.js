var git = require('gift');
var repo = git('./');
setInterval(function(){
    repo.status(function(err, data){
        //Must be a live instance that needs update check.
        console.log(data)
        if(data.clean == true){
            repo.pull(function(err, status, one){
                console.log(err, status)
            });
        }
    });
}, 5000);