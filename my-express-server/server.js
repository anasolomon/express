//jshint esversion:6
const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello world!</h1>");
});

app.get("/contact", function(request, response){
    response.send("Contact me at: ana@gmail.com");
});

app.get("/about", function(request, response){
    response.send("This page is owned by Ana, suck it");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
