(function configurarBusca() {
    const campo = document.getElementById("buscaSite");
    const sugestoes = document.getElementById("sugestoesBusca");

    if (!campo || !sugestoes) return;

    const receitas = [
        { id: "suco-verde", titulo: "Suco Verde com Folhas de Cenoura", termos: "folhas cenoura bebida" },
        { id: "bolo-talhos-beterraba", titulo: "Bolo de Talos de Beterraba", termos: "talos beterraba doce sobremesa" },
        { id: "geleia-cascas-frutas", titulo: "Geleia de Cascas de Frutas", termos: "geleia cascas frutas maçã pera pêssego doce" },
        { id: "farofa-talos", titulo: "Farofa Nutritiva de Talos", termos: "farofa talos couve brócolis agrião acompanhamento" },
        { id: "risoto-talos-espinafre", titulo: "Risoto de Talos de Espinafre", termos: "risoto talos espinafre prato principal" },
        { id: "bowl-frango-legumes", titulo: "Bowl de Frango com Legumes e Grãos", termos: "bowl frango legumes grãos prato principal" }
    ];

    function normalizar(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function abrirResultados(termo) {
        const busca = termo.trim();
        if (!busca) return;

        const buscaNormalizada = normalizar(busca);
        const receita = receitas.find(function (item) {
            const textoPesquisavel = normalizar(item.titulo + " " + item.termos);
            return textoPesquisavel.includes(buscaNormalizada) || buscaNormalizada.includes(normalizar(item.titulo));
        });

        if (receita) {
            window.location.href = "receita.html?receita=" + encodeURIComponent(receita.id);
            return;
        }

        window.location.href = "comunidade.html?busca=" + encodeURIComponent(busca);
    }

    function desenharSugestoes() {
        const termo = campo.value.trim().toLowerCase();
        sugestoes.replaceChildren();

        if (!termo) {
            sugestoes.hidden = true;
            return;
        }

        const encontradas = receitas.filter(function (item) {
            return normalizar(item.titulo + " " + item.termos).includes(normalizar(termo));
        }).slice(0, 6);

        if (!encontradas.length) {
            sugestoes.hidden = true;
            return;
        }

        encontradas.forEach(function (item) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = item.titulo;
            botao.addEventListener("click", function () {
                campo.value = item.titulo;
                abrirResultados(item.titulo);
            });
            sugestoes.appendChild(botao);
        });
        sugestoes.hidden = false;
    }

    campo.addEventListener("input", desenharSugestoes);
    campo.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            abrirResultados(campo.value);
        }
    });
    campo.addEventListener("blur", function () {
        setTimeout(function () { sugestoes.hidden = true; }, 150);
    });
})();
