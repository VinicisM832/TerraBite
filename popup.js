const areapopup = document.getElementById("areapopup");
const abrir = document.getElementById("abrirpopup");

// Verificar se os elementos principais existem
if (!areapopup || !abrir) {
    console.error("Não encontrei #areapopup ou #abrirpopup.");
} else {

    // Carregar o HTML externo
    fetch("popup.html")
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível carregar popup.html"
                );
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
            console.error("Erro ao carregar o popup:", erro);
        });
}


function configurarpopup() {

    const overlay = areapopup.querySelector(".overlaypopup");
    const fechar = overlay.querySelector("#fechar");
    const voltar = overlay.querySelector("#voltar");
    const titulo = overlay.querySelector(".titulo");

    const secoes = overlay.querySelectorAll("[data-conteudo]");

    // Verificar os elementos do popup
    if (!overlay || !fechar || !voltar || !titulo) {
        console.error("Faltam elementos necessários no popup.");
        return;
    }

    // Mostrar a seção selecionada
    function mostrarSecao(nome) {

        const existe = [...secoes].some(secao => {
            return secao.dataset.conteudo === nome;
        });

        if (!existe) {
            console.error("Seção não encontrada:", nome);
            return;
        }

        secoes.forEach(secao => {
            secao.hidden = secao.dataset.conteudo !== nome;
        });

        // Mostrar Voltar apenas nas telas secundárias
        voltar.hidden = nome === "acessibilidade";

        // Atualizar o título
        titulo.textContent = nome === "daltonismo"
            ? "Modos de daltonismo"
            : "Acessibilidade";
    }


    // Abrir o popup
    abrir.addEventListener("click", () => {
        mostrarSecao("acessibilidade");
        overlay.classList.add("ativo");
    });


    // Trocar de seção
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
    function fecharPopup() {
        overlay.classList.remove("ativo");
        mostrarSecao("acessibilidade");
    }

    fechar.addEventListener("click", fecharPopup);


    // Fechar ao clicar fora da janela
    overlay.addEventListener("click", evento => {

        if (evento.target === overlay) {
            fecharPopup();
        }

    });


    // Fechar com ESC
    document.addEventListener("keydown", evento => {

        if (
            evento.key === "Escape" &&
            overlay.classList.contains("ativo")
        ) {
            fecharPopup();
        }

    });

}