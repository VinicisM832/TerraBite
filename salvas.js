(function () {
    const chave = "terraBiteReceitasSalvas";

    function ler() {
        try {
            const salvas = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(salvas) ? salvas : [];
        } catch (erro) {
            return [];
        }
    }

    function salvar(salvas) {
        localStorage.setItem(chave, JSON.stringify(salvas));
        document.dispatchEvent(new CustomEvent("receitas-salvas-atualizadas"));
    }

    function idDaReceita(receita) {
        return typeof receita === "string" ? receita : receita.id;
    }

    function estaSalva(id) {
        return ler().some(function (receita) {
            return idDaReceita(receita) === id;
        });
    }

    function atualizarBotao(botao) {
        const salva = estaSalva(botao.dataset.salvarId);
        botao.textContent = salva ? "⚑" : "⚐";
        botao.classList.toggle("salvo", salva);
        botao.setAttribute("aria-label", salva ? "Remover receita das salvas" : "Salvar receita");
        botao.title = salva ? "Remover das receitas salvas" : "Salvar receita";
    }

    function alternar(receita, botao) {
        const salvas = ler();
        const indice = salvas.findIndex(function (item) {
            return idDaReceita(item) === receita.id;
        });

        if (indice >= 0) {
            salvas.splice(indice, 1);
        } else {
            salvas.push(receita);
        }

        salvar(salvas);
        atualizarBotao(botao);
    }

    function criarBotao(receita) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-salvar-receita";
        botao.dataset.salvarId = receita.id;
        botao.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            alternar(receita, botao);
        });
        atualizarBotao(botao);
        return botao;
    }

    function configurarBotoes() {
        document.querySelectorAll("[data-salvar-id]").forEach(atualizarBotao);
    }

    window.TerraBiteSalvas = {
        ler: ler,
        estaSalva: estaSalva,
        criarBotao: criarBotao,
        configurarBotoes: configurarBotoes
    };

    document.addEventListener("DOMContentLoaded", configurarBotoes);
    document.addEventListener("receitas-salvas-atualizadas", configurarBotoes);
})();
