
module.exports = function (app) {
    var HomeController = {
        // Actions: propriedades do controller que representam funções
        index: function (request, response) {
            response.render('home/index')
        },
        login: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;
            if (nome == 'admin' && senha == 'admin') {
                var usuario = request.body.usuario;
                request.session.usuario = usuario;
                response.redirect('/menu');
            }
            else {
                response.redirect('/');
            }
        },
        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        }
    }
    return HomeController;
};