/*DALTONISMO*/
const modocor = document.querySelectorAll(".modo-cor");

// Recupera o tema salvo
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo) {

    document.body.setAttribute("data-tema", temaSalvo);

    const modoSalvo = document.querySelector(
        `.modo-cor[data-modo="${temaSalvo}"]`
    );

    if (modoSalvo) {
        modoSalvo.classList.add("ativo");
    }
}


// Troca o tema quando clicar
modocor.forEach(function(modo){

    modo.addEventListener("click", function(){

        const tema = modo.dataset.modo;

        // Aplica o tema
        document.body.setAttribute("data-tema", tema);

        // Salva no navegador
        localStorage.setItem("tema", tema);

        // Remove ativo dos outros
        modocor.forEach(function(item){
            item.classList.remove("ativo");
        });

        // Ativa o selecionado
        modo.classList.add("ativo");

    });

});

/*MODO NOTURNO*/
const botaoTema = document.querySelector("#botaoTema");
const iconeTema = document.querySelector("#iconeTema");


// =========================
// RECUPERAR TEMA SALVO
// =========================

if (temaSalvo) {

    document.body.setAttribute("data-tema", temaSalvo);

}


// =========================
// MODO ESCURO
// =========================

if (botaoTema) {

    botaoTema.addEventListener("click", function () {

        const temaAtual = document.body.getAttribute("data-tema");

        if (temaAtual === "noturno") {

            document.body.setAttribute("data-tema", "normal");

            localStorage.setItem("tema", "normal");

            botaoTema.setAttribute("aria-pressed", "false");

            iconeTema.textContent = "☀";

        } else {

            document.body.setAttribute("data-tema", "noturno");

            localStorage.setItem("tema", "noturno");

            botaoTema.setAttribute("aria-pressed", "true");

            iconeTema.textContent = "☾";

        }

    });

}