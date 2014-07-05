var git = require('gift');
var repo = git('./');
setInterval(function(){
    repo.status(function(err, data){
        console.log(data)
        //Must be a live instance that needs update check.
        if(data.clean == true){
            repo.pull("origin", "auto-update", function(err, status, one){
                console.log(err, status, one)
            });
        }
    });
}, 10000);

//Minor Change Test 2