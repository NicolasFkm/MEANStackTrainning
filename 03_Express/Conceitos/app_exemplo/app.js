var express = require('express');
var app = express();

app.get('/exemplo', function(request, response){
  response.send("<h1>exemplo do uso do express</h1>");
});

app.listen(3000, function(){
    console.log("Servidor no ar");
});