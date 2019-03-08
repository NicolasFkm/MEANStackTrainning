module.exports = function(app){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var convidados = Schema({
        nome:{type: "String", required: true}, 
        cpf: {type: "String", required: true},
        email: {type: "String", required: true},
        idEvento: {type: "String", required: true},
    });

    return mongoose.model('convidados', convidados);
}