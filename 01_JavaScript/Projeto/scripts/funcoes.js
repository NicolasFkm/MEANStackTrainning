var estados = [
    { "id": "1", "estado": "SP" },
    { "id": "2", "estado": "RJ" },
    { "id": "3", "estado": "MG" },
    { "id": "4", "estado": "BA" },
];

var cidades = [
    { "id": "1", "idestado": "1", "cidade": "CAMPINAS" },
    { "id": "2", "idestado": "1", "cidade": "SOROCABA" },
    { "id": "3", "idestado": "2", "cidade": "NITEROI" },
    { "id": "4", "idestado": "2", "cidade": "CABO FRIO" },
    { "id": "5", "idestado": "2", "cidade": "ANGRA" },
    { "id": "6", "idestado": "3", "cidade": "BELO HORIZONTE" },
    { "id": "7", "idestado": "3", "cidade": "BETIM" },
    { "id": "8", "idestado": "3", "cidade": "EXTREMA" },
    { "id": "9", "idestado": "4", "cidade": "SALVADOR" },
    { "id": "10", "idestado": "4", "cidade": "PORTO SEGURO" },
];

$(document).ready(function(){
    $.each(estados, function (key, element) {
        $("#estado").append($("<option>", {
            value: element.id,
            text: element.estado
        }));
    });

    $("#estado").change(function(){

        let idestado = $(this).val();
        
        $("#cidade").empty();
        
        $.each(cidades, function(key, element) {
            
            if(element.idestado == idestado){
                $("#cidade").append($("<option>", {
                    value: element.id,
                    text: element.cidade
                }));
            }

        });
        
    });

    $("#btnEnviar").click(function(){
        let descricao = $("#descricao").val();
        let data = $("#data").val();
        let estado = $("#estado").val();
        let cidade = $("#cidade").val();
        let preco = $("#preco").val();

        $("#mensagem").empty();

        if(!descricao){
            $("#mensagem").html("<div class='alert alert-danger'role='alert'>Campo descrição obrigatório</div>");
            return;
        }

        let response = "<strong>Dados do evento</strong><br/>";
        response += "Descrição: " + descricao;
        response += "<br/>Data: " + data;
        response += "<br/>Local: " + cidade+"/"+estado;
        response += "<br/>Preço: " + preco;
        $("#mensagem").html("'<div class='alert alert-success'role='alert'>" + response + "</div>");


    });
})