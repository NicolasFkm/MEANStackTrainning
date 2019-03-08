module.exports = function (app) {
    var EventoController = {
        index: function (req, res) {
            res.render('eventos/index');
        }
    };
    return EventoController;
};