module.exports = function (app) {
    var HomeController = {
        home: function (req, res) {
            res.render('index');
        },
        viewHome: function (req, res) {
            res.render('home')
        },
        viewSobre: function (req, res) {
            res.render('sobre')
        }
    };
    return HomeController;
};