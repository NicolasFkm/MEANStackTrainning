var mongoose = require('mongoose');
var Usuario = mongoose.model("usuarios");
var Evento = mongoose.model("eventos");

module.exports = function (app) {
    var EventosController = {
        dashboard: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render(`eventos/dashboard`, params);
        },

        cadastroUsuario: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadastroUsuario', params);
        },

        cadastroEvento: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadastroEvento', params);
        },

        listaEventos: function (request, response) {

            Evento.find(function (erro, eventos) {
                if (erro) {
                    response.redirect("/dashboard");
                }
                else {
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, eventos: eventos, moment: moment };

                    for (var i = 0, len = eventos.length; i < len; i++) {
                        let date = new Date(eventos[i]['data']);

                        eventos[i]['data_format'] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    }
                    var params = { 'usuario': usuario, eventos: eventos };
                    response.render('eventos/listaEventos', params);
                }
            })

        },

        novoUsuario: function (request, response) {
            var usuario = request.session.usuario,
                nome = request.body.usuario.nome,
                senha = request.body.usuario.senha,
                confirmaSenha = request.body.usuario.confirma;

            if (nome.trim().length > 0 && senha == confirmaSenha && senha.length > 0) {
                var usuario = request.body.usuario;
                Usuario.create(usuario, function (erro, usuario) {
                    if (erro) {
                        response.redirect('/');
                    }
                    else {
                        var s_usuario = request.session.usuario,
                            mensagem = `Usuário ${usuario.nome} incluído com sucesso`,
                            params = { mensagem: mensagem, usuario:  s_usuario };

                        response.redirect('eventos/cadUsuario', params);
                    }
                })
            }
            else {
                response.redirect('/');
            }

        },

        novoEvento: function (request, response) {
            var descricao = request.body.evento.descricao;
            var data = request.body.evento.data.split('/');
            var objDate = new Date(data[2], data[1] - 1, data[0]);
            var preco = request.body.evento.preco;

            var evento = {
                'descricao': descricao,
                'data': objDate,
                'preco': preco
            };

            if (descricao && objDate && preco) {
                Evento.create(evento, function (erro, evento) {
                    if (erro) {

                        response.redirect('/cadastroEvento');
                    }
                    else {
                        
                        var usuario = request.session.usuario,
                            mensagem = `Evento ${evento.descricao} incluído com sucesso`,
                            params = { mensagem: mensagem, usuario: usuario }
                        
                        response.render("eventos/cadEvento", params);
                    }
                })
            }
            else {
                response.redirect('/cadastroEvento');
            }

        }

    }
    return EventosController;
};