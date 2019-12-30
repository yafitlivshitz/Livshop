const mongo = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/";    
dbName = "LivshopDb";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;

// Connect to the DB and initialize the variable with the connection
mongo.connect(url, connectParams, 
    function(err, client) {
        if(err) {                        
            console.log("ERROR! failed to connect to Data base!");
        }
        else {
            db = client.db(dbName);
            console.log("Database created");
        }    
    }
);

// Adds one document to a collection
function addToDb(collectionName, document, callback)
{            
    const collection = db.collection(collectionName);    
    collection.insertOne(document,
    function(err){
        if(err) { 
            console.log("failed to add a document to " + collection + " collection");
            return callback(err);
        }            
        return callback(null, document);
    });        
}

// Finds one document in a collection according to the passed query parameters
function findOne(query, collectionName, callback)
{        
    // get the desired collection we want to search in
    let collection = db.collection(collectionName);

    collection.findOne(query,function(err, document) {
        if(err) {                      
                console.log("DbMgr: failed to find a document in " + collectionName + " collection");

                 return callback(err);
        }   
        
        return callback(null, document);
        }
    );
}

// Build a quary to find a user
function findUserName(userName, collectionName, callback)
{
    let query = {"userName" : userName};    
    return findOne(query, collectionName, callback);
}

// Finds all documents in a collection, according to the passed query parameters
function findAll(query, collectionName, callback)
{        
    // get the desired collection we want to search in
    let collection = db.collection(collectionName);

    collection.find(query).toArray(function(err, documents) {
        if(err) {                      
                console.log("DbMgr::findAll: failed to find a document in " + collectionName + " collection");

                 return callback(err);
        }   
        console.log("DbMgr: found documents in " + collectionName + " collection, query " + query);
        return callback(null, documents);
        }
    );
}

// Build a query to find an item according to a category, or all items with no search criterion
function findAllItemByCategory(category, collectionName, callback)
{
    let query;
    if (category)
        query = {"category" : category};  
    else
        query = {};  
    return findAll(query, collectionName, callback);
}
           
module.exports = { 
    addToDb,
    findUserName,
    findAllItemByCategory  
};