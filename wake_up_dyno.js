var http = require('http'); //importing http

var options = {
    host: 'covalence-final.herokuapp.com',
    path: '/WAKEUP_DYNO'
};
console.log("======WAKUP DYNO START");
http.get(options, function(res) {
    res.on('data', function(chunk) {
        try {
            // optional logging... disable after it's working
            console.log("======WAKUP DYNO: HEROKU RESPONSE: " + chunk);
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function(err) {
    console.log("Error: " + err.message);
});