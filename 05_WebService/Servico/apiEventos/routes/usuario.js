module.exports = function (app) {
    var mongoose = require('mongoose');
    var Usuario = mongoose.model('usuarios');

    app.get('/usuarios', function (request, response) {
        Usuario.find(function (erro, usuarios) {
            if (erro) {
                response.json(erro);
            }
            else {
                response.json(usuarios);
            }
        });
    });

    app.post('/login', function (request, response) {
        var nome = request.body.nome;
        var senha = request.body.senha;
        var usuarioBusca = { 
            'nome': nome, 'senha': senha 
        };

        Usuario.findOne(usuarioBusca).select('nome senha')
            .exec(function (erro, usuario) {
                if (erro) {
                    response.json(erro);
                }
                else {
                    response.json(usuario);
                }
            });
    });

    app.post('/usuarios', function (request, response) {
        var nome = request.body.nome;
        var senha = request.body.senha;

        var usuario = {
            'nome': nome,
            'senha': senha
        };

        Usuario.create(usuario, function (erro, usuario) {
            if (erro) {
                response.json(erro);
            }
            else {
                response.json(usuario);
            }
        })

    });

}