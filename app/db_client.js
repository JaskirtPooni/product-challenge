var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    // hardcoded url to database
    url = 'mongodb://localhost:27017/product-challenge', 
    dbClient;

/**
* Opens a connection with the database
* @return an instance of the MongoDb dbClient
*/
function getDbClient(){
    if (!dbClient) {
       return MongoClient.connect(url).
       then(db =>{
              //assert.equal(null, err);  
             console.log("Connected to database successfully to server");
             dbClient = db;
             return dbClient;
        });   
    }else{
        return dbClient;
    }
}

module.exports = getDbClient();