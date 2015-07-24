var config = require('./config.js');

var ntwitter = require('ntwitter');
var mongo_client = require('mongodb').MongoClient;


mongo_client.connect('mongodb://127.0.0.1/'+config.mongo_db_name, function(err, db){
    if(err) throw err;
    
    init(db);
   
});

function init(db) {
    twitter = new ntwitter(config.twitter);
    var collection = db.collection(config.mongo_collection);
    twitter.stream('statuses/filter', {
        track: config.hashtags
    
    }, function(stream){
        
        stream.on('data', function(result) {
            console.log(result.text);
            var check = result.text.toLowerCase();
            if ((check.indexOf("#greenhug") !=-1) && (check.indexOf("#cprecife4") !=-1) || (check.indexOf("#cpbr4") !=-1)) {
            collection.insert(result, function(err, result){});
            }
        });
        
        stream.on('error', function(err) {
            console.log(err);
           
        });
    });

}