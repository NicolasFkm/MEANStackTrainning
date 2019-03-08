var fn = require('./metodos');

var s = fn.soma(2, 5);
var m = fn.multiplica(2, 5);
var r = fn.recebe(m);

console.log(s);
console.log(m);
console.log(r);

//função execute - recebe uma função callback contendo UM parametro
//Primeira forma: função anônima
var resposta = fn.execute(function(n){ 
    return n.length == 10;
});
console.log('usando função anonima: ' + resposta);

//Segunda forma: arrow function
resposta = fn.execute( n => n.length == 7);
console.log('usando arrow function: ' + resposta);