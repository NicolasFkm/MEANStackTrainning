module.exports = function (app) {
    var home = app.controllers.HomeController;
    app.get('/', home.home);
    app.get('/views/home.ejs', home.viewHome);
    app.get('/views/sobre.ejs', home.viewSobre);
};