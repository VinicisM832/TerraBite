const raiz = document.documentElement;

const CHAVE_MODO_COR = "terraBiteModoCor";
const CHAVE_APARENCIA = "terraBiteAparencia";

const modosValidos = [
    "normal",
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "acromatopsia",
    "alto-contraste"
];


/* DALTONISMO */

function aplicarTema(tema, salvar = true) {

    if (!modosValidos.includes(tema)) {
        tema = "normal";
    }

    if (tema === "normal") {
        raiz.removeAttribute("data-tema");
    } else {
        raiz.setAttribute("data-tema", tema);
    }

    if (salvar) {
        localStorage.setItem(CHAVE_MODO_COR, tema);
    }

    atualizarBotoes();
}


function atualizarBotoes() {

    const temaAtual =
        localStorage.getItem(CHAVE_MODO_COR) || "normal";

    document.querySelectorAll(".modo-cor[data-modo]")
        .forEach(botao => {

            botao.classList.toggle(
                "ativo",
                botao.dataset.modo === temaAtual
            );

        });
}


/* MODO CLARO E NOTURNO */

function aplicarAparencia(aparencia, salvar = true) {

    const noturno = aparencia === "noturno";

    if (noturno) {
        raiz.setAttribute("data-aparencia", "noturno");
    } else {
        raiz.removeAttribute("data-aparencia");
    }

    if (salvar) {
        localStorage.setItem(
            CHAVE_APARENCIA,
            noturno ? "noturno" : "claro"
        );
    }

    atualizarAparencia();
}


function atualizarAparencia() {

    const noturno =
        raiz.getAttribute("data-aparencia") === "noturno";

    const botaoEscuro = document.querySelector('[data-cor="escuro"]');
    const botaoClaro = document.querySelector('[data-cor="claro"]');

    if (botaoEscuro) {
        botaoEscuro.hidden = noturno;
    }

    if (botaoClaro) {
        botaoClaro.hidden = !noturno;
    }

}


/* CLIQUES NOS CONTROLES */

document.addEventListener("click", evento => {

    // Modo de daltonismo
    const botaoCor = evento.target.closest(".modo-cor[data-modo]");

    if (botaoCor) {
        aplicarTema(botaoCor.dataset.modo);
        return;
    }

    // Modo claro ou noturno
    const botaoAparencia = evento.target.closest("[data-cor]");

    if (botaoAparencia) {

        const aparencia =
            botaoAparencia.dataset.cor === "escuro"
                ? "noturno"
                : "claro";

        aplicarAparencia(aparencia);
    }

});


/* RECUPERAR PREFERÊNCIAS SALVAS */

const temaSalvo = localStorage.getItem(CHAVE_MODO_COR) || "normal";

aplicarTema(temaSalvo, false);

const aparenciaSalva =
    localStorage.getItem(CHAVE_APARENCIA) || "claro";

aplicarAparencia(aparenciaSalva, false);


/* ATUALIZAR CONTROLES APÓS CARREGAR O POPUP */

const areaPopup = document.getElementById("areapopup");

if (areaPopup) {

    const observador = new MutationObserver(() => {
        atualizarBotoes();
        atualizarAparencia();
    });

    observador.observe(areaPopup, {
        childList: true,
        subtree: true
    });

}