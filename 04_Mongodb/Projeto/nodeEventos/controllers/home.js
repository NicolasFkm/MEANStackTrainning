var mongoose = require('mongoose');
var Usuario = mongoose.model('usuarios');
var moment = require('moment');
module.exports = function (app) {
    var HomeController = {
        // Actions: propriedades do controller que representam funções
        index: function (request, response) {
            response.render('home/index')
        },
        login: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;

            var query = { 'nome': nome, 'senha': senha };

            Usuario.findOne(query).select('nome senha')
                .exec(function (erro, usuario) {
                    if (erro || !usuario) {
                        var s_erro = 'Usuário ou senha inválidos', 
                        params = { erro: s_erro }; 
                        response.render('home/index', params);
                    }
                    else {
                        request.session.usuario = usuario;
                        response.redirect('dashboard');
                    }
                });
        },
        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        }
    }
    return HomeController;
};