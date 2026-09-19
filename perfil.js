(function carregarPerfil() {
    const chavePerfil = "terraBitePerfil";
    const perfil = document.getElementById("perfil");
    const semCadastro = document.getElementById("perfilSemCadastro");
    const lista = document.getElementById("perfilComentarios");
    const historico = document.getElementById("historicoReceitas");
    const dicas = document.getElementById("dicasPublicadas");
    const avaliacoes = document.getElementById("avaliacoesReceitas");
    const nomesReceitas = {
        "suco-verde": "Suco Verde com Folhas de Cenoura",
        "bolo-talhos-beterraba": "Bolo de Talos de Beterraba",
        "geleia-cascas-frutas": "Geleia de Cascas de Frutas",
        "farofa-talos": "Farofa Nutritiva de Talos",
        "risoto-talos-espinafre": "Risoto de Talos de Espinafre",
        "bowl-frango-legumes": "Bowl de Frango com Legumes e Grãos"
    };
    const imagensReceitas = {
        "suco-verde": "pictures/sucoverde.png",
        "bolo-talhos-beterraba": "pictures/bolobeterraba.png",
        "geleia-cascas-frutas": "pictures/Geleia.png",
        "farofa-talos": "pictures/farofa.png",
        "risoto-talos-espinafre": "pictures/risoto.png",
        "bowl-frango-legumes": "pictures/salada2.png"
    };
    const notasReceitas = {
        "suco-verde": "4.6",
        "bolo-talhos-beterraba": "4.7",
        "geleia-cascas-frutas": "4.5",
        "farofa-talos": "4.6",
        "risoto-talos-espinafre": "4.8",
        "bowl-frango-legumes": "4.5"
    };

    function lerPerfil() {
        try {
            return JSON.parse(localStorage.getItem(chavePerfil));
        } catch (erro) {
            return null;
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

    const perfilSalvo = lerPerfil();
    if (!perfilSalvo) {
        semCadastro.hidden = false;
        return;
    }

    perfil.hidden = false;

    function atualizarDadosVisuais(dados) {
        document.getElementById("nomePerfilVisual").textContent = dados.nome || "-";
        document.getElementById("apelidoPerfilVisual").textContent = dados.apelido || dados.nome || "-";
        document.getElementById("statusPerfilVisual").textContent = dados.status || "Compartilhando receitas e dicas";
        document.getElementById("emailPerfilVisual").textContent = dados.email || "-";
        document.getElementById("aniversarioPerfilVisual").textContent = dados.aniversario
            ? new Date(dados.aniversario + "T00:00:00").toLocaleDateString("pt-BR")
            : "-";
    }

    atualizarDadosVisuais(perfilSalvo);
    const editarPerfil = document.getElementById("editarPerfil");
    const formularioPerfil = document.getElementById("perfilForm");
    const dadosPerfil = document.getElementById("dadosPerfil");

    editarPerfil.addEventListener("click", function () {
        dadosPerfil.hidden = true;
        formularioPerfil.hidden = false;
        document.getElementById("perfilNome").focus();
    });

    document.addEventListener("perfil-atualizado", function () {
        const perfilAtualizado = lerPerfil();
        if (!perfilAtualizado) return;
        atualizarDadosVisuais(perfilAtualizado);
        dadosPerfil.hidden = false;
        formularioPerfil.hidden = true;
    });

    const nomeExibido = document.getElementById("perfilNomeExibido");
    if (nomeExibido) nomeExibido.textContent = perfilSalvo.nome;
    const statusExibido = document.getElementById("perfilStatusExibido");
    if (statusExibido) statusExibido.textContent = perfilSalvo.status || "Compartilhando receitas e dicas";

    function lerReceitasPublicadas() {
        try {
            const receitas = JSON.parse(localStorage.getItem("terraBiteReceitasPublicadas"));
            return Array.isArray(receitas) ? receitas : [];
        } catch (erro) {
            return [];
        }
    }

    function lerHistorico() {
        try {
            const receitas = JSON.parse(localStorage.getItem("terraBiteReceitasVisitadas"));
            return Array.isArray(receitas) ? receitas : [];
        } catch (erro) {
            return [];
        }
    }

    function desenharResumo() {
        const receitasPublicadas = lerReceitasPublicadas();
        const receitasLidas = lerHistorico();
        const notas = receitasLidas.map(function (id) {
            return Number(notasReceitas[id]);
        }).filter(Boolean);
        const media = notas.length ? (notas.reduce((total, nota) => total + nota, 0) / notas.length).toFixed(1) : "0";

        document.getElementById("totalReceitas").textContent = receitasPublicadas.length;
        document.getElementById("totalDicas").textContent = receitasPublicadas.filter((receita) => receita.descricao).length;
        document.getElementById("mediaAvaliacoes").textContent = media;
    }

    function desenharHistorico() {
        historico.innerHTML = "";
        const receitasLidas = lerHistorico();

        if (receitasLidas.length === 0) {
            historico.innerHTML = "<p class=\"lista-vazia\">Você ainda não abriu receitas.</p>";
            return;
        }

        receitasLidas.forEach(function (identificador) {
            const link = document.createElement("a");
            link.className = "receita-historico";
            link.href = "receita.html?receita=" + encodeURIComponent(identificador);

            const imagem = document.createElement("img");
            imagem.src = imagensReceitas[identificador] || "pictures/image 15.png";
            imagem.alt = "";
            link.appendChild(imagem);

            const nome = document.createElement("strong");
            nome.textContent = nomesReceitas[identificador] || "Receita da comunidade";
            link.appendChild(nome);
            historico.appendChild(link);
        });
    }

    function desenharDicas() {
        dicas.innerHTML = "";
        const receitasPublicadas = lerReceitasPublicadas();

        if (receitasPublicadas.length === 0) {
            dicas.innerHTML = "<p class=\"lista-vazia\">Publique uma receita para compartilhar suas dicas.</p>";
            return;
        }

        receitasPublicadas.forEach(function (receita) {
            const item = document.createElement("article");
            item.className = "dica-perfil";
            const titulo = document.createElement("strong");
            titulo.textContent = receita.titulo;
            const texto = document.createElement("p");
            texto.textContent = receita.descricao;
            item.appendChild(titulo);
            item.appendChild(texto);
            dicas.appendChild(item);
        });
    }

    function desenharAvaliacoes() {
        avaliacoes.innerHTML = "";
        const receitasLidas = lerHistorico();

        if (receitasLidas.length === 0) {
            avaliacoes.innerHTML = "<p class=\"lista-vazia\">As avaliações aparecerão depois que você ler receitas.</p>";
            return;
        }

        receitasLidas.forEach(function (identificador) {
            const item = document.createElement("div");
            item.className = "avaliacao-perfil";
            item.innerHTML = `<strong>${nomesReceitas[identificador] || "Receita"}</strong><span>★ ${notasReceitas[identificador] || "0"}</span>`;
            avaliacoes.appendChild(item);
        });
    }

    lista.innerHTML = "";
    const comentariosDoUsuario = [];

    for (let indice = 0; indice < localStorage.length; indice++) {
        const chave = localStorage.key(indice);
        if (!chave || !chave.startsWith("terraBiteComentarios_")) continue;

        const identificador = chave.replace("terraBiteComentarios_", "");
        lerComentarios(chave).forEach(function (comentario) {
            if (comentario.autor === perfilSalvo.nome || comentario.autor === perfilSalvo.apelido) {
                comentariosDoUsuario.push({
                    ...comentario,
                    receita: nomesReceitas[identificador] || "Receita da comunidade"
                });
            }
        });
    }

    if (comentariosDoUsuario.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "lista-vazia";
        vazio.textContent = "Você ainda não comentou em receitas.";
        lista.appendChild(vazio);
    } else comentariosDoUsuario.forEach(function (comentario) {
        const item = document.createElement("article");
        item.className = "comentario-perfil";

        const receita = document.createElement("strong");
        receita.textContent = comentario.receita;
        item.appendChild(receita);

        const texto = document.createElement("p");
        texto.textContent = comentario.texto;
        item.appendChild(texto);

        const data = document.createElement("small");
        data.textContent = new Date(comentario.data).toLocaleDateString("pt-BR");
        item.appendChild(data);
        lista.appendChild(item);
    });

    desenharResumo();
    desenharHistorico();
    desenharDicas();
    desenharAvaliacoes();
})();
