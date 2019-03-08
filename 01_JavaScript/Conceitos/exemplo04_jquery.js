$(document).ready(function () {
    $("#btnEnviar").click(function () {

        $("#resposta").removeClass("erro", "ok");
        let nome = $("#nome").val();
        let idade = $("#idade").val();
        let msg = `${nome} é `;
        if (!idade) {
            msg = "Erro, digite a idade";
            $("#resposta").addClass("erro");
        }
        else {
            $("#resposta").addClass("ok");
            msg += (idade > 18) ? "maior de Idade" : "menor de Idade";
        }

        $("#resposta").stop().hide().html(msg).fadeIn(2000).delay(4000).fadeOut(2000);

    })
});