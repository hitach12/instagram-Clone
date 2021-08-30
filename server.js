const express = require('express');
const cors = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/api', (req,res) =>{
    var Connection = require('tedious').Connection;  
    var config = {  
        server: '41.140.243.212',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'MedFadel', //update me
                password: '123456'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'attestation'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
        executeStatement(); 
    });
    
    connection.connect();
    
    var Request = require('tedious').Request;  
        var TYPES = require('tedious').TYPES;  
      
        function executeStatement() {  
            request = new Request("select * from acte_naissance;", function(err) {  
            if (err) {  
                console.log(err);}  
            });  
            var data = "";  
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    // console.log('NULL');  
                  } else {  
                    data+= column.value + " ";  
                  }  
                });  
                // data ="";  
            });  
      
            request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');  
            });  
            
            // Close the connection after the final event emitted by the request, after the callback passes
            request.on("requestCompleted", function (rowCount, more) {
                res.send({result:data})
                connection.close();
            });
            connection.execSql(request);  
        }  
})

app.listen(API_PORT,() => console.log(`listening on port ${API_PORT}`));


