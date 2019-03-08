module.exports = function (app) {
    var mongoose = require('mongoose');
    var Convidado = mongoose.model('convidados');
    var Evento = mongoose.model('eventos');

    app.get('/convidados', function (request, response) {

        Convidado.find(function (error, convidados) {
            if (error) {
                response.json(error);
            }
            else {
                response.json(convidados);
            }
        });

    })


    app.get("/eventos/:id/convidados", function (request, response) {
        
        var idEvento = request.params.id;
        var query = { 'idEvento': idEvento };

        // Evento.findById(idEvento, function(error, evento){
        //     if (error) {
        //         response.json(error);
        //     }
        //     else {
        //         console.log(evento);
        //         response.json(evento.convidados);
        //     }
        // });
        Convidado.find(query, function(error, convidado){
            if (error) {
                response.json(error);
            }
            else {
                response.json(convidado);
            }
        })

    });

    app.post('/eventos/:id/convidados', function (request, response) {

        var idEvento = request.params.id;
        var cpf = request.body.cpf;
        var nome = request.body.nome;
        var email = request.body.email;

        var convidadoModel = {
            "cpf": cpf,
            "nome": nome,
            "email": email,
            "idEvento": idEvento
        };

        Convidado.create(convidadoModel, function(error, convidado){
            if (error) {
                response.json(error);
            }
            else {
                console.log(convidado);
                // Evento.findByIdAndUpdate(idEvento, {$push: {convidados: convidado}},
                //     function(error, evento){
                   
                //         if (error) {
                //             response.json(error);
                //         }
                //         else {
                            response.json(convidado);
                //         }

                //     }
                // );
            }
        });





    })
}