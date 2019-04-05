var redis = require("redis"),
    client = redis.createClient('6379', '34.73.166.126');

    client.on("error", function (err) {
        console.log("Error " + err);
    });
    
    client.on('connect', function() {
        console.log('Redis');
    });

    module.exports.client = client;