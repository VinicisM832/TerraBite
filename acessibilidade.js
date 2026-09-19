const painel =
    document.getElementById("painel");

const fechar =
    document.getElementById("fechar");

const abrirPainel =
    document.getElementById("abrirPainel");

const botaoContraste =
    document.getElementById("botaoContraste");

const iconeContraste =
    document.getElementById("iconeContraste");

const diminuirFonte =
    document.getElementById("diminuirFonte");

const aumentarFonte =
    document.getElementById("aumentarFonte");

const fonteNormal =
    document.getElementById("fonteNormal");

const leituraVoz =
    document.getElementById("leituraVoz");

const abrirDaltonismo =
    document.getElementById("abrirDaltonismo");

const fecharDaltonismo =
    document.getElementById("fecharDaltonismo");

const voltar =
    document.getElementById("voltar");

const telaPrincipal =
    document.getElementById("telaPrincipal");

const telaDaltonismo =
    document.getElementById("telaDaltonismo");

fechar.addEventListener("click", function () {

    painel.style.display = "none";

    abrirPainel.style.display = "flex";

});

abrirPainel.addEventListener("click", function () {

    painel.style.display = "block";

    abrirPainel.style.display = "none";

});

botaoContraste.addEventListener("click", function () {

    document.body.classList.toggle("alto-contraste");


    if (
        document.body.classList.contains("alto-contraste")
    ) {

        iconeContraste.textContent = "🌙";

        botaoContraste.setAttribute(
            "aria-label",
            "Desativar alto contraste"
        );

    } else {

        iconeContraste.textContent = "☀️";

        botaoContraste.setAttribute(
            "aria-label",
            "Ativar alto contraste"
        );

    }

});


let tamanhoFonte = 100;



diminuirFonte.addEventListener("click", function () {

    if (tamanhoFonte > 80) {

        tamanhoFonte -= 10;

        document.documentElement.style.fontSize =
            tamanhoFonte + "%";

    }

});

aumentarFonte.addEventListener("click", function () {

    if (tamanhoFonte < 140) {

        tamanhoFonte += 10;

        document.documentElement.style.fontSize =
            tamanhoFonte + "%";

    }

});


fonteNormal.addEventListener("click", function () {

    tamanhoFonte = 100;

    document.documentElement.style.fontSize = "100%";

});

leituraVoz.addEventListener("click", function () {

    if (!("speechSynthesis" in window)) {

        alert(
            "Seu navegador não suporta leitura em voz."
        );

        return;

    }

    const texto =
        document.querySelector(".conteudo-site").innerText;


    const fala =
        new SpeechSynthesisUtterance(texto);


    fala.lang = "pt-BR";

    fala.rate = 1;

    fala.pitch = 1;


    speechSynthesis.cancel();


    speechSynthesis.speak(fala);

});



abrirDaltonismo.addEventListener("click", function () {

    telaPrincipal.style.display = "none";

    telaDaltonismo.style.display = "block";

});


voltar.addEventListener("click", function () {

    telaDaltonismo.style.display = "none";

    telaPrincipal.style.display = "block";

});


fecharDaltonismo.addEventListener("click", function () {

    painel.style.display = "none";

    abrirPainel.style.display = "flex";

});


const modos =
    document.querySelectorAll(".modo-cor");


modos.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const modo =
            this.getAttribute("data-modo");

        const tituloModo =
            this.querySelector("h3")?.textContent || "este modo de cores";

        const confirmou = window.confirm(
            "Tem certeza que deseja mudar o modo de cores para " +
            tituloModo + "?"
        );

        if (!confirmou) return;

        document.body.classList.remove(
            "protanopia",
            "deuteranopia",
            "tritanopia"
        );


        if (modo === "protanopia") {

            document.body.classList.add(
                "protanopia"
            );

        }


        if (modo === "deuteranopia") {

            document.body.classList.add(
                "deuteranopia"
            );

        }


        if (modo === "tritanopia") {

            document.body.classList.add(
                "tritanopia"
            );

        }

        telaDaltonismo.style.display = "none";

        telaPrincipal.style.display = "block";

    });

});