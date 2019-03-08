module.exports = function (app) {
    var evento = app.controllers.EventoController;
    app.get('/eventos', evento.index);
};