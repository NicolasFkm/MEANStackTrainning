var btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", exibir);

function exibir() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    // let maioridade = (idade < 18)? "Maior de Idade":"Menor de Idade";
    
    let msg = `Nome = ${nome} \nIdade = ${idade} anos`;

    if(idade < 18){
        msg += "\nMenor de Idade";
    }
    else if(idade == 18){
        msg += "\nPossui exatamente 18 anos";
    }
    else{
        msg += "\nMaior de Idade";
    }

    alert(msg);

}