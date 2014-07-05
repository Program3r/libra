

//Finds Open Ports
var getport = require('getport')


//Find an Open Port
getport(function (e, p) {
    if (e) throw e
    var gith = require('gith').create(p);
    gith({
      repo: 'Program3r/libra'
    }).on( 'all', function( payload ) {
      console.log( 'Post-receive happened!' );
    });
})
