// =========================================================
// script.js — Validação e envio do formulário de Cadastro
// =========================================================

const formulario = document.getElementById("cadastroForm");

// Só executa se a página atual tiver o formulário de cadastro
if (formulario) {

    const campos = {
        nome: document.getElementById("nome"),
        aniversario: document.getElementById("aniversario"),
        email: document.getElementById("email"),
        senha: document.getElementById("senha"),
    };

    const erros = {
        nome: document.getElementById("erroNome"),
        aniversario: document.getElementById("erroAniversario"),
        email: document.getElementById("erroEmail"),
        senha: document.getElementById("erroSenha"),
    };

    const popupSucesso = document.getElementById("sucesso");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        limparErros();

        const nomeValido = validarNome(campos.nome.value.trim());
        const aniversarioValido = validarAniversario(campos.aniversario.value);
        const emailValido = validarEmail(campos.email.value.trim());
        const senhaValida = validarSenha(campos.senha.value);

        const formularioValido =
            nomeValido && aniversarioValido && emailValido && senhaValida;

        if (!formularioValido) {
            return;
        }

        exibirSucessoERedirecionar();
    });

    // ---------------------------------------------------
    // Validações
    // ---------------------------------------------------

    function validarNome(nome) {
        if (nome === "") {
            erros.nome.textContent = "* Digite seu nome.";
            return false;
        }

        if (nome.length < 3) {
            erros.nome.textContent = "* O nome deve ter pelo menos 3 caracteres.";
            return false;
        }

        if (nome.split(/\s+/).length < 2) {
            erros.nome.textContent = "* Digite seu nome e sobrenome.";
            return false;
        }

        return true;
    }

    function validarAniversario(aniversario) {
        if (aniversario === "") {
            erros.aniversario.textContent = "* Informe sua data de nascimento.";
            return false;
        }

        const idade = calcularIdade(aniversario);

        if (idade < 10) {
            erros.aniversario.textContent =
                "* Você precisa ter pelo menos 10 anos para se cadastrar.";
            return false;
        }

        return true;
    }

    function calcularIdade(dataString) {
        const dataNascimento = new Date(dataString);
        const hoje = new Date();

        let idade = hoje.getFullYear() - dataNascimento.getFullYear();

        const mesAtual = hoje.getMonth();
        const mesNascimento = dataNascimento.getMonth();

        const aniversarioAindaNaoChegouEsteAno =
            mesAtual < mesNascimento ||
            (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate());

        if (aniversarioAindaNaoChegouEsteAno) {
            idade--;
        }

        return idade;
    }

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            erros.email.textContent = "* Informe seu e-mail.";
            return false;
        }

        if (!regexEmail.test(email)) {
            erros.email.textContent = "* Digite um e-mail válido.";
            return false;
        }

        return true;
    }

    function validarSenha(senha) {
        if (senha === "") {
            erros.senha.textContent = "* Informe uma senha.";
            return false;
        }

        if (senha.length < 8) {
            erros.senha.textContent = "* A senha deve ter pelo menos 8 caracteres.";
            return false;
        }

        return true;
    }

    function limparErros() {
        Object.values(erros).forEach((span) => (span.textContent = ""));
    }

    // ---------------------------------------------------
    // Sucesso
    // ---------------------------------------------------

    function exibirSucessoERedirecionar() {
        // Esconde a tela de cadastro
        document.querySelector(".container").style.display = "none";

        // Mostra o pop-up de sucesso
        popupSucesso.style.display = "flex";

        // Vai para a Home depois de 3 segundos
        setTimeout(function () {
            window.location.href = "HomePage.html";
        }, 3000);
    }
}
