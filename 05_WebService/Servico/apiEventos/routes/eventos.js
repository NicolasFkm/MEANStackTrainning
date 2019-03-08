module.exports = function (app) {
    var mongoose = require('mongoose');
    var Evento = mongoose.model('eventos');

    app.get('/', function (request, response) {
        response.send('Eventozada show no ar');
    });

    app.get('/eventos', function (request, response) {

        Evento.find(function (error, eventos) {
            if (error) {
                response.json(error);
            }
            else {
                response.json(eventos);
            }
        });

    });

    app.get('/eventos/:id', function (request, response) {
        // console.log(request);
        console.log(request.connection.remoteAddress);
        // console.log(request.connection);
        

        var idEvento = request.params.id;
        console.log(`ID - ${idEvento} Encontrado`);

        Evento.findById(idEvento, function (error, evento) {
            if (error) {
                response.json(error);
            }
            else {
                response.json(evento);
            }
        })

    });

    app.post('/eventos', function (request, response) {

        var descricao = request.body.descricao;
        var data = request.body.data.split('/');
        var objDate = new Date(data[2], data[1] - 1, data[0]);
        var preco = request.body.preco;

        var evento = {
            'descricao': descricao,
            'data': objDate,
            'preco': preco
        };

        Evento.create(evento, function (erro, evento) {
            if (erro) {
                response.json(erro);
            }
            else {
                response.json(evento);
            }
        });

    });

    app.put('/eventos/:id', function (request, response) {

        var id = request.params.id;

        Evento.findById(id, function (erro, evento) {
            if (erro) {
                response.json(erro);
            }
            else {
                var evento_upd = evento;
                var data = request.body.data.split('/');
                var objDate = new Date(data[2], data[1] - 1, data[0]);
                evento_upd.descricao = request.body.descricao;
                evento_upd.data = objDate;
                evento_upd.preco = request.body.preco;
               
                evento_upd.save(function (erro, evento) {
                    if (erro) {
                        response.json(erro);
                    }
                    else {
                        response.json(evento);
                    }
                });
            }
        });
    });


    app.delete('/eventos/:id', function (request, response) {

        var id = request.params.id;
        Evento.findById(id, function (erro, evento) {
            if(erro){
                response.json(erro);
            }
            else{
                Evento.remove(evento, function (erro, evento) {
                    if (erro) {
                        response.json(erro);
                    }
                    else {
                        response.send('removido');
                    }
                });
            }

        });

    });
}