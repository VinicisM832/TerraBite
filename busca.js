(function configurarBusca() {
    const campo = document.getElementById("buscaSite");
    const sugestoes = document.getElementById("sugestoesBusca");

    if (!campo || !sugestoes) return;

    const termos = [
        "Suco Verde com Folhas de Cenoura",
        "Bolo de Talos de Beterraba",
        "Geleia de Cascas de Frutas",
        "Farofa Nutritiva de Talos",
        "Risoto de Talos de Espinafre",
        "Bowl de Frango com Legumes e Grãos",
        "Bebidas",
        "Doces",
        "Acompanhamentos",
        "Pratos principais",
        "Aproveitamento de alimentos",
        "Dicas da comunidade"
    ];

    function abrirResultados(termo) {
        const busca = termo.trim();
        if (!busca) return;
        window.location.href = "comunidade.html?busca=" + encodeURIComponent(busca);
    }

    function desenharSugestoes() {
        const termo = campo.value.trim().toLowerCase();
        sugestoes.replaceChildren();

        if (!termo) {
            sugestoes.hidden = true;
            return;
        }

        const encontradas = termos.filter(function (item) {
            return item.toLowerCase().includes(termo);
        }).slice(0, 6);

        if (!encontradas.length) {
            sugestoes.hidden = true;
            return;
        }

        encontradas.forEach(function (item) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = item;
            botao.addEventListener("click", function () {
                campo.value = item;
                abrirResultados(item);
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
