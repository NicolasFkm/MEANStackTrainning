module.exports = function (app) {
    var mongoose = require('mongoose');
    var Pagamento = mongoose.model('pagamentos');

    app.get('/pagamentos', function (request, response) {
        Pagamento.find(function (erro, pagamento) {
            if (erro) {
                response.json(erro);
            }
            else {
                response.json(pagamento);
            }
        });
    });

    app.post('/pagamentos', function (request, response) {
        var evento = request.body.evento;
        var preco = request.body.preco;
        var numcartao = request.body.numcartao;
        var cvv = request.body.cvv;
        var pagamento = {
            'evento': evento,
            'preco': preco,
            'numcartao': numcartao,
            'cvv': cvv
        };
        
        Pagamento.create(pagamento, function (erro, pagto) {
            if (erro) {
                response.json(erro);
            }
            else {
                response.json(pagto);
            }
        });

    });

}