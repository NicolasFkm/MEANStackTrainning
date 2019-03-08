var express = require('express');
var load = require('express-load');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var database = require("./config/dbConnection");

var database = database()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
 next();
});

load('models').then('routes').into(app);

var Evento = app.models.eventos;
var Pagamento = app.models.pagamentos;

app.listen(3200, function () {
    console.log("\n**** Aplicação no ar ****\n");
});