const addToDb = require('./dbMgr').addToDb;
const findAllItemByCategory = require('./dbMgr').findAllItemByCategory;
var uuidCreator = require('uuid');

class Items{    

    constructor(){
        Items.collectionName = "Items"; 
    }

    // Add a new item
    add(req, res){

        console.log("adding item" + req.body.itemName);

        // Initialize the DB document
        const document = { 
            category: req.body.category,
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,            
            uuid: uuidCreator.v4()               
        };    
        
        // Add it to the DB
        addToDb(Items.collectionName, document,
            function(err, responseDocument) {
                if (err)
                {
                    console.log("Failed to add a new item to the DB");
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {
                    console.log("A new item was added. item name: " + document.itemName);

                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });             
    }   

    // Get all items, according to a category, or all items
    getAllItems(req, res)
    {
        console.log("got a request to get all items");

        findAllItemByCategory(req.params.category, Items.collectionName,
            function(err, documents)
            {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {
                    console.log("items were found");
                    
                    res.send({
                        'status': 'success',
                        'data': documents});
                }
            });
    }
}

module.exports = Items;
