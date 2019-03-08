var app = angular.module("appAngular", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.ejs"
        })
        .when("/users/:id", {
            controller: 'UserController',
            templateUrl: "views/sobre.ejs"
        })
        .when("/eventos", {
            controller: 'EventoController',
            templateUrl: "views/eventos/index.ejs"
        })
        .otherwise({ redirectTo: "/" });
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['Access-Control-Allow-Origin: *'];
}]);

app.controller("UserController", function ($scope, $routeParams) {
    $scope.nome = $routeParams.id;
});

app.controller("EventoController", function ($http) {
    this.eventos = [];
    $http.get("http://localhost:3200/eventos")
        .then(
            response=>{
                this.eventos = response.data;
            },
            (error)=> {
                alert("Erro ao recuperar eventos: " + error);
            }
        )
});