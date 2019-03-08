var express = require('express');
var load = require('express-load');

var app = express();
var bodyParser = require('body-parser');

var cors = require('cors');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// View Engine e Path static
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// CORS config
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content - Type, Accept");
    next();
});

// Autoload 
load('controllers')
    .then('routes')
    .into(app);

app.listen(3500, function () {
    console.log('** Server on ** \n');

})