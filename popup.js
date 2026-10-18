const areapopup = document.getElementById("areapopup");

// Carregar o HTML externo
fetch("popup.html")
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o Popup");
        }

        return resposta.text();
    })

    .then(html => {
        areapopup.innerHTML = `
            <div class="overlaypopup">
                ${html}
            </div>
        `;

        configurarpopup();
    })

    .catch(erro => {
        console.log(erro);
    });


function configurarpopup() {
    const overlay = areapopup.querySelector(".overlaypopup");
    const abrir = document.getElementById("abrirpopup");
    const fechar = areapopup.querySelector("#fechar");
    const voltar = areapopup.querySelector("#voltar");

    const secoes = areapopup.querySelectorAll("[data-conteudo]");

    // Mostrar uma seção específica
    function mostrarSecao(nome) {
        secoes.forEach(secao => {
            secao.hidden = secao.dataset.conteudo !== nome;
        });
    }

    // Abrir o popup sempre na tela principal
    abrir.addEventListener("click", () => {
        mostrarSecao("acessibilidade");
        overlay.classList.add("ativo");
    });

    // Trocar de seção dentro do popup
    const botoes = overlay.querySelectorAll("[data-abre-conteudo]");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const nome = botao.dataset.abreConteudo;

            mostrarSecao(nome);
        });
    });

    // Voltar para a tela principal
    voltar.addEventListener("click", () => {
        mostrarSecao("acessibilidade");
    });

    // Fechar o popup
    function fecharpopup() {
        overlay.classList.remove("ativo");
        mostrarSecao("acessibilidade");
    }

    fechar.addEventListener("click", fecharpopup);

    // Fechar clicando fora
    overlay.addEventListener("click", evento => {
        if (evento.target === overlay) {
            fecharpopup();
        }
    });

    // Fechar com ESC
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            fecharpopup();
        }
    });
}