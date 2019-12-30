const addToDb = require('./dbMgr').addToDb;
const findUserName = require('./dbMgr').findUserName;
var uuidCreator = require('uuid');

class Users{    

    constructor(){
        Users.collectionName = "Users"; 
    }

    // Handle registration request
    add(req, res){

        // Initialize the DB document
        const document = { 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            uuid: uuidCreator.v4()               
        };    
        
        // TODO: make userName field unique
        
        addToDb(Users.collectionName, document,
            function(err, responseDocument) {
                if (err)
                {
                    console.log("Failed to add a new user to the DB");
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {
                    console.log("A new user was added. username: " + document.userName);

                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });             
    }
   
    find(req, res) {
        
        console.log("got a request to search user " + req.params.userName);

        findUserName(req.params.userName, Users.collectionName,
            function(err, document)
            {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {

                    console.log("user was found. password is " + document.password);

                    if (document.password == req.body.password)
                    {
                        console.log("password match");
                        
                        res.send({
                            'status': 'success',
                            'data': document});
                    }
                    else  
                    {
                        console.log("password doesnt match!");
                        
                        res.send({'status': 'Failed',
                        'error': err});
                        
                    }
                }
            });
    }
}

module.exports = Users;
