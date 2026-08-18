const formulario = document.getElementById("cadastroForm");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const aniversario = document.getElementById("aniversario").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const mensagensErro = document.getElementById("mensagensErro");

    mensagensErro.innerHTML = "";

    let erros = [];

    // Nome
    if(nome.length < 3){
        erros.push("Digite um nome válido.");
    }

    // Nome deve conter pelo menos nome e sobrenome
    if(nome.split(" ").length < 2){
        erros.push("Digite nome e sobrenome.");
    }

    // Data
   if(aniversario === ""){
    erros.push("Informe sua data de nascimento.");
} else {

    const dataNascimento = new Date(aniversario);
    const hoje = new Date();

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();

    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento &&
         hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }

    if (idade < 8) {
        erros.push("Você precisa ter pelo menos 8 anos para se cadastrar.");
    }
}

    // Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(email)){
        erros.push("Digite um e-mail válido.");
    }

    // Senha
    if(senha.length < 8){
        erros.push("A senha deve ter pelo menos 8 caracteres.");
    }

    // Exibe os erros
    if(erros.length > 0){

        erros.forEach(erro => {
            mensagensErro.innerHTML +=
            `<div class="erro">${erro}</div>`;
        });

        return;
    }
    document.getElementById("sucesso").style.display = "flex";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2500);

});
