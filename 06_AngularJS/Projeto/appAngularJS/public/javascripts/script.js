var app = angular.module('appAngular', []);
app.controller("PrincipalController", ['$http', function ($http) {
    
    this.items = [];
    this.novoEvento = {};

    var listarTodos = () =>{
        return $http.get('http://localhost:3200/eventos')
            .then(response => {
                this.items = response.data;
            },
                error => {
                    alert("Erro: " + error);
                }
            )
    };

    this.addEvento = () => {
        $http({
            url: 'http://localhost:3200/eventos/',
            method: 'POST',
            data: this.novoEvento,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            this.novoEvento = {};
        }, (error) => {
            alert('Erro reportado: ' + error);
        }).then(listarTodos);
    }

    listarTodos();
}]);