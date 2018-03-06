var mongoose = require('mongoose');

function addTable(array){
    var tableDiv = document.getElementById("team-table");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    
    table.border = '1';
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Team";
    heading[1] = "Division";
    
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (var i = 0; i < heading.length; i++) {
        var th = document.createElement('TH');
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

    //TABLE ROWS
    for (var i = 0; i < array.length; i++) {
        var tr = document.createElement('TR');
        for (var j = 0; j < array[i].length; j++) {
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(array[i][j]));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }  
    tableDiv.appendChild(table);
    
}

function databaseConnect(){
    var mongodbUri = 'mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb';
    //connecting to database
    mongoose.connect(mongodbUri);
    var db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on("open", function(){
      console.log("mongodb is connected!!");
    });
    
    var teamCollec = db.collection('Teams');
    teamCollec.find().toArray(function(err, Teams){
        if(err) {return console.dir(err);}
        //console.log(Teams);
        addTable(Teams);
      });
      
    mongoose.connection.db.close(function (err){
        if(err) throw err;
    });
      
}