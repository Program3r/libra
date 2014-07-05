var git = require('gift');
var repo = git('./');
setInterval(function(){
    repo.status(function(err, data){
        //Must be a live instance that needs update check.
        if(data.clean == true){
            repo.pull("origin", "auto-update", function(err, status, one){
            });
        }
    });
}, 5000);

//Minor Change Test