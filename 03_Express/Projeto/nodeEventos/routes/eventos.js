module.exports = function (app) {
    var valida = require('./../middlewares/valida');
    var eventos = app.controllers.eventos;
    app.get('/menu', valida, eventos.menu);
    app.get('/cadastroUsuario', valida, eventos.cadastroUsuario);
    app.get('/cadastroEvento', valida, eventos.cadastroEvento);
    app.get('/listaEventos', valida, eventos.listaEventos);
    app.post('/eventos/novoUsuario', valida, eventos.novoUsuario);
    app.post('/eventos/novoEvento', valida, eventos.novoEvento);
}