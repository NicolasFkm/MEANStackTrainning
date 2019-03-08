var mongoose = require('mongoose');
var http = require('http');
var Usuario = mongoose.model('usuarios');

module.exports = function (app) {
    var HomeController = {
        // Actions: propriedades do controller que representam funções
        index: function (request, response) {
            response.render('home/index')
        },
        login: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;

            var query = JSON.stringify({ 'nome': nome, 'senha': senha });

            var info = {
                host: 'localhost',
                port: '3200',
                path: '/login',
                method: ' ',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': query.length
                }
            };
            
            var reqPost = http.request(info, function (res) {
                res.on('data', function (data) {
                    request.session.usuario = JSON.parse(data);
                    response.redirect('/menu');
                });
            });

            reqPost.write(query);
            reqPost.end();
            reqPost.on('error', function (e) {
                response.redirect('/');
            });
        },

        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        }
    }
    return HomeController;
};