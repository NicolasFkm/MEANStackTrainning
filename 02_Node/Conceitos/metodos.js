//definindo uma função tradicional
var par = function(n){
    return n % 2 == 0 ? 'par' : 'impar';
}

exports.soma = function (x, y){
    return (x + y) + ' - ' + par(x+y);
}

exports.multiplica = function(x, y){
    return (x * y) + ' - ' + par(x*y);
}

exports.recebe = function(callback){
    return 'from callback: ' + callback;
}

var texto = "Bom dia";
exports.execute = function(operacao){
    return operacao(texto);
}