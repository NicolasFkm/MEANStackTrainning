var estados = [
    { 'id': 1, 'nome': "AC" },
    { 'id': 2, 'nome': "AL" },
    { 'id': 3, 'nome': "AM" },
    { 'id': 4, 'nome': "AP" },
    { 'id': 5, 'nome': "BA" },
    { 'id': 6, 'nome': "CE" },
    { 'id': 7, 'nome': "DF" },
    { 'id': 8, 'nome': "ES" },
    { 'id': 9, 'nome': "GO" },
    { 'id': 10, 'nome': "MA" },
    { 'id': 11, 'nome': "MG" },
    { 'id': 12, 'nome': "MS" },
    { 'id': 13, 'nome': "MT" },
    { 'id': 14, 'nome': "PA" },
    { 'id': 15, 'nome': "PB" },
    { 'id': 16, 'nome': "PE" },
    { 'id': 17, 'nome': "PI" },
    { 'id': 18, 'nome': "PR" },
    { 'id': 19, 'nome': "RJ" },
    { 'id': 20, 'nome': "RN" },
    { 'id': 21, 'nome': "RS" },
    { 'id': 22, 'nome': "RO" },
    { 'id': 23, 'nome': "RR" },
    { 'id': 24, 'nome': "SC" },
    { 'id': 25, 'nome': "SE" },
    { 'id': 26, 'nome': "SP" },
    { 'id': 27, 'nome': "TO" }
];

var cidades = [
    { 'id': 1, 'idestado': 26, 'nome': "São Paulo" },
    { 'id': 2, 'idestado': 26, 'nome': "Campinas" },
    { 'id': 3, 'idestado': 26, 'nome': "São Bernardo" },
    { 'id': 4, 'idestado': 19, 'nome': "Rio de Janeiro" },
    { 'id': 5, 'idestado': 19, 'nome': "Niterói" },
    { 'id': 6, 'idestado': 11, 'nome': "Belo Horizonte" },
    { 'id': 7, 'idestado': 11, 'nome': "Extrema" },
    { 'id': 8, 'idestado': 5, 'nome': "Salvador" },
    { 'id': 9, 'idestado': 5, 'nome': "Porto Seguro" }
];

$(document).ready(function () {
    $.each(estados, function (key, element) {
        $("#estado").append($("<option>", {
            value: element.id,
            text: element.nome
        }));
    });

    $("#estado").change(function(){

        let idestado = $(this).val();
        
        $("#cidade").empty();
        
        $.each(cidades, function(key, element) {
            
            if(element.idestado == idestado){
                $("#cidade").append($("<option>", {
                    value: element.id,
                    text: element.nome
                }));
            }

        });

    });


});