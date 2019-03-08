var mongoose = require('mongoose');
var Usuario = mongoose.model("usuarios");
var Evento = mongoose.model("eventos");
var http = require('http');

module.exports = function (app) {
    var EventosController = {
        menu: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render(`eventos/menu`, params);
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
                    response.redirect("/menu");
                }
                else {
                    var usuario = request.session.usuario;

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
                var usuario = JSON.stringify(request.body.usuario);

                var info = {
                    host: 'localhost',
                    port: '3200',
                    path: '/usuarios',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': usuario.length
                    }
                };

                var reqPost = http.request(info, function (res) {
                    res.on('data', function (data) {
                        // console.log('Incluindo registros:\n');
                        // process.stdout.write(data);
                        // console.log('\n\nHTTP POST Concluído');
                        response.redirect('/menu');
                    });
                });

                reqPost.write(usuario);
                reqPost.end();
                reqPost.on('error', function (e) {
                    response.redirect('/cadastroUsuario');
                })

            }
            else {
                response.redirect('/');
            }

        },

        novoEvento: function (request, response) {
            var descricao = request.body.evento.descricao;
            var data = request.body.evento.data;
            var preco = request.body.evento.preco;

            var evento = JSON.stringify({
                'descricao': descricao,
                'data': data,
                'preco': preco
            });

            if (descricao && data && preco) {
                var info = {
                    host: 'localhost',
                    port: '3200',
                    path: '/eventos',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': evento.length
                    }
                };
                //definição do pbjeto para requisição POST
                var reqPost = http.request(info, function (res) {
                    res.on('data', function (data) {
                        response.redirect('/menu');
                    });
                });

                //Gravação dos dados
                reqPost.write(evento);
                reqPost.end();
                reqPost.on('error', function (e) {
                    response.redirect('/cadastroEvento');
                })

            }
            else {
                response.redirect('/cadastroEvento');
            }

        },

        listaEventosWS: function (request, response) {
            //array para conter os eventos
            var eventos = [];
            //informações da requisição GET
            var info = {
                host: 'localhost',
                port: '3200',
                path: '/eventos',
                method: 'GET'
            };
            //chamando o serviço
            http.request(info, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    eventos = JSON.parse(data);
                    for (var i = 0, len = eventos.length; i < len; i++) {
                        let date = new Date(eventos[i]['data']);

                        eventos[i]['data_format'] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    }
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, eventos: eventos };
                    response.render('eventos/listaEventosWS', params);
                });
            }).end();
        },

        pagamento: function (request, response) {
            var evento = request.params.evento,
                preco = request.params.preco,
                usuario = request.session.usuario,
                params = {
                    usuario: usuario, evento: evento,
                    preco: preco
                };
            response.render('eventos/pagamento', params);
        },

        listaPagamentos: function (request, response) {
            var pagamentos = [];
            //informações da requisição GET
            var info = {
                host: 'localhost',
                port: '3200',
                path: '/pagamentos',
                method: 'GET'
            };
            //chamando o serviço
            http.request(info, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    pagamentos = JSON.parse(data);
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, pagamentos: pagamentos };
                    response.render('eventos/listaPagamentos', params);
                });
            }).end();
        },

        novoPagamento: function (request, response) {
            var cartao = request.body.cartao;
            var cartaoPost = JSON.stringify({
                'evento': cartao.evento,
                'preco': cartao.preco,
                'numcartao': cartao.numcartao,
                'cvv': cartao.cvv
            });
            //informações da requisição POST
            var info = {
                host: 'localhost',
                port: '3200',
                path: '/pagamentos',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': cartaoPost.length
                }
            };

            //definição do pbjeto para requisição POST
            var reqPost = http.request(info, function (res) {
                res.on('data', function (data) {
                    response.redirect('/menu');
                });
            });

            //Gravação dos dados
            reqPost.write(cartaoPost);
            reqPost.end();
            reqPost.on('error', function (e) {
                console.error(e);
            });
        },
    }
    return EventosController;
};