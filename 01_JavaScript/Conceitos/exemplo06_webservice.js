$(document).ready(function () {

    $("#acaoLer").click(function () {

        $.ajax({
            dataType: 'json',
            url: 'http://emiliocelso.com.br/api/android',
            method: 'GET',
            success: function (response) {
                $("table tbody").empty();
                $.each(response, function (k, v) {
                    let row = $("<tr>");
                    row.append($("<td>", {
                        text: v.Nome
                    }));
                    row.append($("<td>", {
                        text: v.Telefone
                    }));
                    row.append($("<td>", {
                        text: v.DataNascimento
                    }));
                    $("table tbody").append(row);
                });
            },
            error: function (error) {
                alert(`ERRO: ${error.responseText}`);
            }
        });

    });

    $("#acaoEnviar").click(function () {

        $.ajax({
            url: 'http://emiliocelso.com.br/api/android',
            method: 'POST',
            data: {
                ome: $("#nome").val(),
                Telefone: $("#telefone").val(),
                DataNascimento: $("#data").val(),
            },
            success: function (response) {
                alert("Dados inseridos com sucesso");
            },
            error: function (error) {
                alert(`ERRO: ${error.responseText}`);
            }
        });

    });

})