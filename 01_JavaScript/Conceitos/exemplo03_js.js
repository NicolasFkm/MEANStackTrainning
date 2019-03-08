function exibir(){
    alert("Função Callback");
}

document.getElementById("btn-1").addEventListener("click", exibir);

document.getElementById("btn-2").addEventListener("click", function(){
        alert('Função Anônima');
    }
);

document.getElementById("btn-3").addEventListener("click", () => alert('Arrow Function'));