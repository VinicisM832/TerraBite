// =========================================================
// script.js — Validação e envio do formulário de Cadastro
// =========================================================

const formulario = document.getElementById("cadastroForm");
const perfil = document.getElementById("perfil");
const perfilForm = document.getElementById("perfilForm");
const fotoPerfilInput = document.getElementById("perfilFotoArquivo");
const chavePerfil = "terraBitePerfil";

function lerPerfil() {
    try {
        return JSON.parse(localStorage.getItem(chavePerfil));
    } catch (erro) {
        return null;
    }
}

function salvarPerfil(dados) {
    try {
        localStorage.setItem(chavePerfil, JSON.stringify(dados));
        return true;
    } catch (erro) {
        return false;
    }
}

function mostrarPerfil(dados) {
    if (!dados || !perfil) return;

    document.getElementById("perfilNome").value = dados.nome || "";
    const apelido = document.getElementById("perfilApelido");
    if (apelido) apelido.value = dados.apelido || dados.nome || "";
    document.getElementById("perfilAniversario").value = dados.aniversario || "";
    document.getElementById("perfilEmail").value = dados.email || "";
    const status = document.getElementById("perfilStatus");
    if (status) status.value = dados.status || "Compartilhando receitas e dicas";
    const nomeExibido = document.getElementById("perfilNomeExibido");
    const statusExibido = document.getElementById("perfilStatusExibido");
    const fotoPerfil = document.getElementById("perfilFoto");
    const iniciais = document.getElementById("perfilIniciais");

    if (nomeExibido) nomeExibido.textContent = dados.nome || "Meu perfil";
    if (statusExibido) statusExibido.textContent = dados.status || "Compartilhando receitas e dicas";
    if (fotoPerfil && dados.foto) {
        fotoPerfil.src = dados.foto;
        fotoPerfil.hidden = false;
        if (iniciais) iniciais.hidden = true;
    }
    if (formulario) formulario.hidden = true;
    perfil.hidden = false;
    const tituloPagina = document.querySelector("h1");
    if (tituloPagina) tituloPagina.textContent = "Meu perfil";
}

const perfilSalvo = lerPerfil();
if (perfilSalvo) mostrarPerfil(perfilSalvo);

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

        salvarPerfil({
            nome: campos.nome.value.trim(),
            aniversario: campos.aniversario.value,
            email: campos.email.value.trim()
        });
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

        // Abre o perfil depois de concluir o cadastro
        setTimeout(function () {
            window.location.href = "perfil.html";
        }, 3000);
    }
}

if (perfilForm) {
    perfilForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const dadosAtualizados = {
            nome: document.getElementById("perfilNome").value.trim(),
            apelido: document.getElementById("perfilApelido")?.value.trim() || document.getElementById("perfilNome").value.trim(),
            aniversario: document.getElementById("perfilAniversario").value,
            email: document.getElementById("perfilEmail").value.trim(),
            status: document.getElementById("perfilStatus")?.value.trim() || "Compartilhando receitas e dicas",
            foto: lerPerfil()?.foto || ""
        };

        const salvarDados = function () {
            if (salvarPerfil(dadosAtualizados)) {
                const nomeExibido = document.getElementById("perfilNomeExibido");
                const statusExibido = document.getElementById("perfilStatusExibido");
                if (nomeExibido) nomeExibido.textContent = dadosAtualizados.nome;
                if (statusExibido) statusExibido.textContent = dadosAtualizados.status;
                document.getElementById("perfilMensagem").textContent = "Alterações salvas com sucesso.";
                document.dispatchEvent(new CustomEvent("perfil-atualizado"));
            }
        };

        if (fotoPerfilInput && fotoPerfilInput.files[0]) {
            const leitor = new FileReader();
            leitor.onload = function () {
                dadosAtualizados.foto = leitor.result;
                salvarDados();
            };
            leitor.readAsDataURL(fotoPerfilInput.files[0]);
        } else {
            salvarDados();
        }
    });
}

const novoCadastro = document.getElementById("novoCadastro");
if (novoCadastro) {
    novoCadastro.addEventListener("click", function () {
        perfil.hidden = true;
        formulario.hidden = false;
        formulario.reset();
        document.querySelector("h1").textContent = "Criar conta";
    });
}

const publicarReceitaForm = document.getElementById("publicarReceitaForm");
const receitasPublicadas = document.getElementById("receitasPublicadas");
const fotoReceitaInput = document.getElementById("receitaFoto");
const chaveReceitasPublicadas = "terraBiteReceitasPublicadas";
let indiceReceitaEditando = -1;

function lerReceitasPublicadas() {
    try {
        const receitas = JSON.parse(localStorage.getItem(chaveReceitasPublicadas));
        return Array.isArray(receitas) ? receitas : [];
    } catch (erro) {
        return [];
    }
}

function salvarReceitasPublicadas(receitas) {
    try {
        localStorage.setItem(chaveReceitasPublicadas, JSON.stringify(receitas));
        return true;
    } catch (erro) {
        return false;
    }
}

function desenharReceitasPublicadas() {
    if (!receitasPublicadas) return;

    receitasPublicadas.innerHTML = "";
    const receitasDoUsuario = lerReceitasPublicadas();

    if (receitasDoUsuario.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "lista-vazia";
        vazio.textContent = "Você ainda não publicou receitas.";
        receitasPublicadas.appendChild(vazio);
        return;
    }

    receitasDoUsuario.forEach(function (receita, indice) {
        const item = document.createElement("article");
        item.className = "receita-publicada";

        if (receita.foto) {
            const imagem = document.createElement("img");
            imagem.src = receita.foto;
            imagem.alt = "Foto de " + receita.titulo;
            item.appendChild(imagem);
        }

        const titulo = document.createElement("h3");
        titulo.textContent = receita.titulo;
        item.appendChild(titulo);

        const descricao = document.createElement("p");
        descricao.textContent = receita.descricao;
        item.appendChild(descricao);

        const autor = document.createElement("small");
        autor.textContent = "Publicada por " + receita.autor;
        item.appendChild(autor);

        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "editar-receita";
        editar.dataset.indice = indice;
        editar.textContent = "Editar publicação";
        item.appendChild(editar);

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "excluir-receita";
        excluir.dataset.indice = indice;
        excluir.textContent = "Excluir receita";
        item.appendChild(excluir);

        receitasPublicadas.appendChild(item);
    });

    document.querySelectorAll(".editar-receita").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const indice = Number(this.dataset.indice);
            const receita = lerReceitasPublicadas()[indice];

            if (!receita) return;

            indiceReceitaEditando = indice;
            document.getElementById("receitaTitulo").value = receita.titulo || "";
            document.getElementById("receitaDescricao").value = receita.descricao || "";
            document.getElementById("receitaIngredientes").value = receita.ingredientes || "";
            document.getElementById("receitaPreparo").value = receita.preparo || "";
            publicarReceitaForm.querySelector("button[type=submit]").textContent = "Salvar publicação";
            document.getElementById("cancelarEdicao").hidden = false;
            document.getElementById("receitaTitulo").focus();
        });
    });

    document.querySelectorAll(".excluir-receita").forEach(function (botao) {
        botao.addEventListener("click", async function () {
            const indice = Number(this.dataset.indice);
            const receitas = lerReceitasPublicadas();
            if (!receitas[indice]) return;

            const confirmar = window.confirmarAcaoNaTela || window.confirm;
            const confirmou = await confirmar("Deseja excluir esta receita publicada?");
            if (!confirmou) return;

            receitas.splice(indice, 1);
            if (!salvarReceitasPublicadas(receitas)) return;
            if (indiceReceitaEditando === indice) {
                indiceReceitaEditando = -1;
                publicarReceitaForm.reset();
                publicarReceitaForm.querySelector("button[type=submit]").textContent = "Publicar receita";
                document.getElementById("cancelarEdicao").hidden = true;
            }
            desenharReceitasPublicadas();
        });
    });
}

if (publicarReceitaForm) {
    desenharReceitasPublicadas();

    publicarReceitaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const perfilAtual = lerPerfil();
        const mensagem = document.getElementById("receitaMensagem");

        if (!perfilAtual) {
            mensagem.textContent = "Cadastre-se para publicar uma receita.";
            return;
        }

        const novaReceita = {
            id: "publicada-" + Date.now(),
            titulo: document.getElementById("receitaTitulo").value.trim(),
            descricao: document.getElementById("receitaDescricao").value.trim(),
            ingredientes: document.getElementById("receitaIngredientes").value.trim(),
            preparo: document.getElementById("receitaPreparo").value.trim(),
            autor: perfilAtual.nome,
            data: new Date().toISOString()
        };

        const salvarPublicacao = function (foto) {
            const receitasDoUsuario = lerReceitasPublicadas();
            novaReceita.foto = foto || (indiceReceitaEditando >= 0 ? receitasDoUsuario[indiceReceitaEditando].foto || "" : "");

            if (indiceReceitaEditando >= 0) {
                receitasDoUsuario[indiceReceitaEditando] = {
                    ...receitasDoUsuario[indiceReceitaEditando],
                    ...novaReceita
                };
            } else {
                receitasDoUsuario.unshift(novaReceita);
            }

            if (!salvarReceitasPublicadas(receitasDoUsuario)) {
                mensagem.textContent = "Não foi possível salvar. Verifique o armazenamento do navegador.";
                return;
            }
            indiceReceitaEditando = -1;
            publicarReceitaForm.reset();
            publicarReceitaForm.querySelector("button[type=submit]").textContent = "Publicar receita";
            document.getElementById("cancelarEdicao").hidden = true;
            mensagem.textContent = "Publicação salva com sucesso.";
            desenharReceitasPublicadas();
        };

        if (fotoReceitaInput && fotoReceitaInput.files[0]) {
            const leitor = new FileReader();
            leitor.onload = function () {
                salvarPublicacao(leitor.result);
            };
            leitor.readAsDataURL(fotoReceitaInput.files[0]);
        } else {
            salvarPublicacao("");
        }
    });
}

const cancelarEdicao = document.getElementById("cancelarEdicao");
if (cancelarEdicao) {
    cancelarEdicao.addEventListener("click", function () {
        indiceReceitaEditando = -1;
        publicarReceitaForm.reset();
        publicarReceitaForm.querySelector("button[type=submit]").textContent = "Publicar receita";
        cancelarEdicao.hidden = true;
        document.getElementById("receitaMensagem").textContent = "Edição cancelada.";
    });
}
