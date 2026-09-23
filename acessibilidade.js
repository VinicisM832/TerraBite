const painel =
    document.getElementById("painel");

const fechar =
    document.getElementById("fechar");

const abrirPainel =
    document.getElementById("abrirPainel");

const botaoTema =
    document.getElementById("botaoTema");

const iconeTema =
    document.getElementById("iconeTema");

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

botaoTema.addEventListener("click", function () {

    const escuro = !document.body.classList.contains("modo-escuro");
    document.body.classList.toggle("modo-escuro", escuro);
    localStorage.setItem("terraBiteTema", escuro ? "escuro" : "claro");

    iconeTema.textContent = escuro ? "🌙" : "☀️";
    botaoTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
    botaoTema.setAttribute("aria-pressed", String(escuro));

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

function obterVozHumana() {
    const vozes = speechSynthesis.getVoices();
    const vozesBrasileiras = vozes.filter(function (voz) {
        return /^pt-BR$/i.test(voz.lang) || /^pt_BR$/i.test(voz.lang);
    });
    const preferencias = ["daniel", "ricardo", "felipe", "jorge", "microsoft", "google"];

    return vozesBrasileiras.sort(function (primeira, segunda) {
        const pontuacao = function (voz) {
            const nome = voz.name.toLowerCase();
            return preferencias.reduce(function (total, preferencia, indice) {
                return total + (nome.includes(preferencia) ? preferencias.length - indice : 0);
            }, 0) + (voz.localService ? 1 : 0);
        };
        return pontuacao(segunda) - pontuacao(primeira);
    })[0] || null;
}

leituraVoz.addEventListener("click", function () {

    if (!("speechSynthesis" in window)) {

        alert(
            "Seu navegador não suporta leitura em voz."
        );

        return;

    }

    const texto =
        document.querySelector(".conteudo-site").innerText;


    const falar = function () {
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = "pt-BR";
        fala.voice = obterVozHumana();
        fala.rate = 0.82;
        fala.pitch = 0.55;
        fala.volume = 0.7;
        speechSynthesis.cancel();
        speechSynthesis.speak(fala);
    };

    if (speechSynthesis.getVoices().length) {
        falar();
    } else {
        speechSynthesis.addEventListener("voiceschanged", falar, { once: true });
    }

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