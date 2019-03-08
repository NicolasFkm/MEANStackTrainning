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
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/listaEventos', params);
        },
        novoUsuario: function (request, response) {
            var usuario = request.session.usuario,
                nome = request.body.usuario.nome,
                senha = request.body.usuario.senha,
                confirmaSenha = request.body.usuario.confirma,
                params = { usuario: usuario };

            //código a ser implementado
            response.redirect('/menu');
        },
        novoEvento: function (request, response) {
            var descricao = request.body.evento.descricao;
            var data = request.body.evento.data.split('/');
            //formato dd/MM/yyyy
            var objDate = new Date(data[2], data[1] - 1, data[0]);
            var preco = request.body.evento.preco;
            //código a ser implementado
            response.redirect('/menu');
        }
    }
    return EventosController;
};