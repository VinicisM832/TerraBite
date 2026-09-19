const receitasBase = [
    { id: "suco-verde", titulo: "Suco Verde com Folhas de Cenoura", descricao: "Bebida leve aproveitando folhas nutritivas da cenoura.", topico: "Bebidas", imagem: "pictures/sucoverde.png", nota: 4.6, autor: "Terra Bite" },
    { id: "bolo-talhos-beterraba", titulo: "Bolo de Talos de Beterraba", descricao: "Bolo de chocolate úmido aproveitando talos de beterraba.", topico: "Doces", imagem: "pictures/bolobeterraba.png", nota: 4.7, autor: "Terra Bite" },
    { id: "geleia-cascas-frutas", titulo: "Geleia de Cascas de Frutas", descricao: "Geleia doce feita com cascas de maçã, pera e pêssego.", topico: "Doces", imagem: "pictures/Geleia.png", nota: 4.5, autor: "Terra Bite" },
    { id: "farofa-talos", titulo: "Farofa Nutritiva de Talos", descricao: "Acompanhamento sustentável com talos de couve, brócolis e agrião.", topico: "Acompanhamentos", imagem: "pictures/farofa.png", nota: 4.6, autor: "Terra Bite" },
    { id: "risoto-talos-espinafre", titulo: "Risoto de Talos de Espinafre", descricao: "Risoto cremoso e nutritivo com talos de espinafre.", topico: "Pratos principais", imagem: "pictures/risoto.png", nota: 4.8, autor: "Terra Bite" },
    { id: "bowl-frango-legumes", titulo: "Bowl de Frango com Legumes e Grãos", descricao: "Bowl com frango, repolho, folhas verdes e grãos.", topico: "Pratos principais", imagem: "pictures/salada2.png", nota: 4.5, autor: "Terra Bite" }
];

(function iniciarComunidade() {
    const feed = document.getElementById("comunidadeFeed");
    const formulario = document.getElementById("comunidadeReceitaForm");
    const aviso = document.getElementById("avisoPublicacao");
    const busca = document.getElementById("buscaComunidade");
    const filtro = document.getElementById("filtroFeed");
    const filtroTopico = document.getElementById("filtroTopico");
    let receitasPublicadas = lerReceitasPublicadas();

    const termoInicial = new URLSearchParams(window.location.search).get("busca");
    if (termoInicial) busca.value = termoInicial;

    function lerPerfil() {
        try {
            return JSON.parse(localStorage.getItem("terraBitePerfil"));
        } catch (erro) {
            return null;
        }
    }

    function lerReceitasPublicadas() {
        try {
            const receitas = JSON.parse(localStorage.getItem("terraBiteReceitasPublicadas"));
            return Array.isArray(receitas) ? receitas : [];
        } catch (erro) {
            return [];
        }
    }

    function lerComentarios(chave) {
        try {
            const comentarios = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(comentarios) ? comentarios : [];
        } catch (erro) {
            return [];
        }
    }

    function lerNotas(chave) {
        try {
            const notas = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(notas) ? notas : [];
        } catch (erro) {
            return [];
        }
    }

    function salvarImagem(input, callback) {
        if (!input.files[0]) {
            callback("");
            return;
        }
        const leitor = new FileReader();
        leitor.onload = function () { callback(leitor.result); };
        leitor.readAsDataURL(input.files[0]);
    }

    function obterFeed() {
        const publicadas = receitasPublicadas.map(function (receita, indice) {
            return {
                ...receita,
                id: receita.id || "publicada-" + indice,
                autor: receita.autor || "Membro da comunidade",
                nota: 0,
                topico: receita.topico || "Aproveitamento",
                imagem: receita.foto || "pictures/image 15.png",
                publicada: true
            };
        });
        return [...receitasBase, ...publicadas];
    }

    function calcularNota(receita) {
        const notas = lerNotas("terraBiteAvaliacoes_" + receita.id);
        const notaBase = Number(receita.nota) || 0;
        if (!notas.length) return notaBase;
        return ((notaBase + notas.reduce((total, nota) => total + nota, 0)) / (notas.length + (notaBase ? 1 : 0))).toFixed(1);
    }

    function criarEstrelas(receita) {
        const grupo = document.createElement("div");
        grupo.className = "comunidade-estrelas";
        let minhaNota = Number(localStorage.getItem("terraBiteMinhaAvaliacao_" + receita.id)) || 0;

        for (let nota = 1; nota <= 5; nota++) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = nota <= minhaNota ? "★" : "☆";
            botao.title = "Avaliar com " + nota + " estrelas";
            botao.addEventListener("click", function () {
                const chave = "terraBiteAvaliacoes_" + receita.id;
                const notas = lerNotas(chave);
                if (minhaNota) {
                    const indiceNota = notas.indexOf(minhaNota);
                    if (indiceNota >= 0) notas.splice(indiceNota, 1);
                }
                notas.push(nota);
                minhaNota = nota;
                localStorage.setItem(chave, JSON.stringify(notas));
                localStorage.setItem("terraBiteMinhaAvaliacao_" + receita.id, String(nota));
                grupo.querySelectorAll("button").forEach(function (estrela, indice) {
                    estrela.textContent = indice < nota ? "★" : "☆";
                });
                atualizarNotaTexto(receita);
            });
            grupo.appendChild(botao);
        }
        return grupo;
    }

    function atualizarNotaTexto(receita) {
        const nota = document.querySelector(`[data-nota-receita="${receita.id}"]`);
        if (nota) nota.textContent = calcularNota(receita);
    }

    function criarCard(receita) {
        const card = document.createElement("article");
        card.className = "comunidade-card";
        card.dataset.titulo = receita.titulo.toLowerCase();

        const imagem = document.createElement("img");
        imagem.src = receita.imagem;
        imagem.alt = "Foto de " + receita.titulo;
        card.appendChild(imagem);

        const titulo = document.createElement("h3");
        titulo.textContent = receita.titulo;
        card.appendChild(titulo);

        const botaoSalvar = TerraBiteSalvas.criarBotao({
            id: receita.id,
            titulo: receita.titulo,
            imagem: receita.imagem || receita.foto || "pictures/image 15.png",
            publicada: Boolean(receita.publicada)
        });
        card.appendChild(botaoSalvar);

        const descricao = document.createElement("p");
        descricao.textContent = receita.descricao;
        card.appendChild(descricao);

        const autor = document.createElement("small");
        autor.className = "comunidade-autor";
        autor.textContent = "Por " + receita.autor;
        card.appendChild(autor);

        const topico = document.createElement("small");
        topico.className = "comunidade-topico";
        topico.textContent = receita.topico || "Aproveitamento";
        card.appendChild(topico);

        if (receita.publicada) {
            const detalhes = document.createElement("details");
            detalhes.open = true;
            const resumo = document.createElement("summary");
            resumo.textContent = "Ver receita completa";
            detalhes.appendChild(resumo);
            const ingredientes = document.createElement("p");
            ingredientes.textContent = "Ingredientes:\n" + receita.ingredientes;
            ingredientes.style.whiteSpace = "pre-line";
            detalhes.appendChild(ingredientes);
            const preparo = document.createElement("p");
            preparo.textContent = "Modo de preparo:\n" + receita.preparo;
            preparo.style.whiteSpace = "pre-line";
            detalhes.appendChild(preparo);
            card.appendChild(detalhes);
        } else {
            const link = document.createElement("a");
            link.href = "receita.html?receita=" + encodeURIComponent(receita.id);
            link.textContent = "Abrir receita completa";
            card.appendChild(link);
        }

        const acoes = document.createElement("div");
        acoes.className = "comunidade-acoes";
        acoes.appendChild(botaoSalvar);
        const nota = document.createElement("span");
        nota.dataset.notaReceita = receita.id;
        nota.textContent = calcularNota(receita);
        acoes.appendChild(nota);
        acoes.appendChild(criarEstrelas(receita));
        const comentar = document.createElement("button");
        comentar.type = "button";
        comentar.className = "comunidade-comentar";
        comentar.textContent = "Comentar";
        acoes.appendChild(comentar);
        card.appendChild(acoes);

        const comentarios = document.createElement("div");
        comentarios.className = "comunidade-comentarios";
        comentarios.hidden = false;
        renderizarComentarios(receita.id, comentarios);
        comentar.addEventListener("click", function () {
            comentarios.hidden = !comentarios.hidden;
            comentar.textContent = comentarios.hidden ? "Mostrar comentários" : "Ocultar comentários";
        });
        card.appendChild(comentarios);
        return card;
    }

    function renderizarComentarios(identificador, container) {
        const chave = "terraBiteComentarios_" + identificador;
        const existentes = document.createElement("div");
        lerComentarios(chave).forEach(function (comentario) {
            const item = document.createElement("div");
            item.className = "comunidade-comentario";
            const autor = document.createElement("strong");
            autor.textContent = comentario.autor;
            const texto = document.createElement("p");
            texto.textContent = comentario.texto;
            item.appendChild(autor);
            item.appendChild(texto);
            existentes.appendChild(item);
        });
        container.appendChild(existentes);

        const formularioComentario = document.createElement("form");
        const campo = document.createElement("textarea");
        campo.rows = 2;
        campo.placeholder = "Comente como visitante ou pelo seu perfil...";
        campo.required = true;
        const botao = document.createElement("button");
        botao.type = "submit";
        botao.textContent = "Publicar comentário";
        formularioComentario.appendChild(campo);
        formularioComentario.appendChild(botao);
        formularioComentario.addEventListener("submit", function (event) {
            event.preventDefault();
            const perfil = lerPerfil();
            const comentarios = lerComentarios(chave);
            comentarios.push({ autor: perfil ? (perfil.apelido || perfil.nome) : "Visitante", texto: campo.value.trim(), data: new Date().toISOString() });
            localStorage.setItem(chave, JSON.stringify(comentarios));
            container.replaceChildren();
            renderizarComentarios(identificador, container);
        });
        container.appendChild(formularioComentario);
    }

    function renderizarFeed() {
        const termo = busca.value.trim().toLowerCase();
        let lista = obterFeed().filter(function (receita) {
            const correspondeNome = receita.titulo.toLowerCase().includes(termo);
            const correspondeRelacionado = [receita.descricao, receita.topico, receita.autor]
                .join(" ").toLowerCase().includes(termo);
            const correspondeTopico = filtroTopico.value === "todos" || receita.topico === filtroTopico.value;
            return (correspondeNome || correspondeRelacionado) && correspondeTopico;
        });
        if (filtro.value === "avaliadas") lista.sort((a, b) => Number(calcularNota(b)) - Number(calcularNota(a)));
        feed.replaceChildren();
        lista.forEach(function (receita) { feed.appendChild(criarCard(receita)); });
    }

    const perfil = lerPerfil();
    if (perfil) {
        formulario.hidden = false;
        aviso.textContent = "Você está conectado como " + (perfil.apelido || perfil.nome) + ". Publique uma receita completa.";
    } else {
        aviso.innerHTML = "Acesse <a href=\"perfil.html\">seu perfil</a> para publicar uma receita completa.";
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        const perfilAtual = lerPerfil();
        const mensagem = document.getElementById("mensagemPublicacao");
        if (!perfilAtual) {
            mensagem.textContent = "Acesse seu perfil para publicar receitas.";
            return;
        }

        salvarImagem(document.getElementById("comunidadeFoto"), function (foto) {
            const receita = {
                id: "publicada-" + Date.now(),
                titulo: document.getElementById("comunidadeTitulo").value.trim(),
                topico: document.getElementById("comunidadeTopico").value,
                descricao: document.getElementById("comunidadeDescricao").value.trim(),
                ingredientes: document.getElementById("comunidadeIngredientes").value.trim(),
                preparo: document.getElementById("comunidadePreparo").value.trim(),
                foto: foto,
                autor: perfilAtual.nome,
                data: new Date().toISOString()
            };
            receitasPublicadas.unshift(receita);
            localStorage.setItem("terraBiteReceitasPublicadas", JSON.stringify(receitasPublicadas));
            formulario.reset();
            mensagem.textContent = "Receita publicada na comunidade.";
            renderizarFeed();
        });
    });

    busca.addEventListener("input", renderizarFeed);
    filtro.addEventListener("change", renderizarFeed);
    filtroTopico.addEventListener("change", renderizarFeed);
    renderizarFeed();
})();
