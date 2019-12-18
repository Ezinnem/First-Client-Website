var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
const path = require('path');
var db = new sqlite3.Database(path.join(__dirname,'db/sqlite/database.db'));
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname,  'public')));
app.use(bodyParser.urlencoded({extended: false}));



//routes is created inorder to respond to request from the client
app.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "public/about.html"));
});
app.get("/comments", function(request, response){
 console.log('GET request recieved at /comments');
 db.all('SELECT * FROM comments', function(err, rows){
   if(err){
     console.log("Error: "+ err);
     
   }
   else{
     response.send(rows);
   }
 });
});
app.post("/comments", function(request, response){
  console.log("POST request recieved at /comments");
  db.run('INSERT INTO comments VALUES (?, ?)',[request.body.name, request.body.comment], function(err){
    if(err){
      console.log("Error: " + err);
    }
    else{
      response.status(200).redirect('about.html');
    }
  });
});
app.listen(3000, function(){
  console.log('server is running on port 3000');
});