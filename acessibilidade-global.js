window.confirmarAcaoNaTela = function (mensagem) {
    return new Promise(function (resolver) {
        const modal = document.createElement("div");
        modal.className = "confirmacao-acessibilidade confirmacao-exclusao";
        modal.innerHTML = `
            <div class="confirmacao-caixa">
                <h2>Confirmação</h2>
                <p></p>
                <div class="confirmacao-acoes">
                    <button type="button" class="cancelar-acao">Cancelar</button>
                    <button type="button" class="aceitar-acao">Excluir</button>
                </div>
            </div>`;
        modal.querySelector("p").textContent = mensagem;
        document.body.appendChild(modal);

        function fechar(resultado) {
            modal.remove();
            resolver(resultado);
        }

        modal.querySelector(".cancelar-acao").addEventListener("click", function () {
            fechar(false);
        });
        modal.querySelector(".aceitar-acao").addEventListener("click", function () {
            fechar(true);
        });
    });
};

(function () {
    function garantirFiltrosDaltonismo() {
        if (
            document.getElementById("protanopia") &&
            document.getElementById("deuteranopia") &&
            document.getElementById("tritanopia")
        ) return;

        const filtros = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        filtros.id = "filtrosAcessibilidade";
        filtros.setAttribute("aria-hidden", "true");
        filtros.style.position = "absolute";
        filtros.style.width = "0";
        filtros.style.height = "0";
        filtros.innerHTML = `
            <filter id="protanopia">
                <feColorMatrix type="matrix" values="
                    0.567 0.433 0 0 0
                    0.558 0.442 0 0 0
                    0 0.242 0.758 0 0
                    0 0 0 1 0" />
            </filter>
            <filter id="deuteranopia">
                <feColorMatrix type="matrix" values="
                    0.625 0.375 0 0 0
                    0.700 0.300 0 0 0
                    0 0.300 0.700 0 0
                    0 0 0 1 0" />
            </filter>
            <filter id="tritanopia">
                <feColorMatrix type="matrix" values="
                    0.950 0.050 0 0 0
                    0 0.433 0.567 0 0
                    0 0.475 0.525 0 0
                    0 0 0 1 0" />
            </filter>`;
        document.body.prepend(filtros);
    }

    garantirFiltrosDaltonismo();

    const trigger = document.querySelector(".acessibilidade") || document.getElementById("abrirPainel");
    let painel = document.getElementById("painel");

    if (!trigger) return;

    if (!painel) {
        painel = document.createElement("section");
        painel.id = "painel";
        painel.className = "painel";
        painel.hidden = true;
        painel.setAttribute("aria-label", "Painel de acessibilidade");
        painel.innerHTML = `
            <div id="telaPrincipal">
                <header class="cabecalho">
                    <div class="icone-olho">👁</div>
                    <div class="titulo"><h2>Acessibilidade</h2><p>Personalize sua Experiência</p></div>
                    <button id="fechar" class="fechar" aria-label="Fechar painel">✕</button>
                </header>
                <div class="aviso">Todas as configurações são aplicadas em tempo real e melhoram a experiência de navegação.</div>
                <div class="card">
                    <div class="icone-card">◐</div>
                    <div class="informacao"><h3>Alto Contraste</h3><p>Melhora a legibilidade do texto</p></div>
                    <button id="botaoContraste" class="switch" aria-label="Ativar alto contraste"><span id="iconeContraste">☀️</span></button>
                </div>
                <div class="card">
                    <div class="icone-card">T</div>
                    <div class="informacao"><h3>Tamanho da Fonte</h3><p>Ajustar o tamanho da fonte</p></div>
                    <div class="botoes-fonte">
                        <button id="diminuirFonte">A −</button>
                        <button id="fonteNormal"><strong>A</strong><span>Normal</span></button>
                        <button id="aumentarFonte">A +</button>
                    </div>
                </div>
                <div class="opcoes">
                    <button id="leituraVoz" class="card-opcao"><div class="icone-opcao">🔊</div><h3>Leitura em Voz</h3><p>Ouvir o conteúdo narrado</p></button>
                    <button id="abrirDaltonismo" class="card-opcao"><div class="icone-opcao">👁</div><h3>Modos de Daltonismo</h3><p>Adaptar as cores</p></button>
                </div>
            </div>
            <div id="telaDaltonismo" class="tela-daltonismo" hidden>
                <header class="cabecalho">
                    <div class="icone-olho">👁</div>
                    <div class="titulo"><h2>Acessibilidade</h2><p>Personalize sua Experiência</p></div>
                    <button id="fecharDaltonismo" class="fechar" aria-label="Fechar painel">✕</button>
                </header>
                <div class="conteudo-daltonismo">
                    <div class="titulo-daltonismo"><div class="icone-card">👁</div><div><h2>Modos de Daltonismo</h2><p>Adaptação de cores para melhor visualização</p></div></div>
                    <button class="modo-cor" data-modo="protanopia"><div class="texto-cor"><h3>Protanopia</h3><p>Vermelho-verde</p></div><div class="cores"><span class="cor protanopia-1"></span><span class="cor protanopia-2"></span><span class="cor protanopia-3"></span></div></button>
                    <button class="modo-cor" data-modo="deuteranopia"><div class="texto-cor"><h3>Deuteranopia</h3><p>Verde-vermelho</p></div><div class="cores"><span class="cor deuteranopia-1"></span><span class="cor deuteranopia-2"></span><span class="cor deuteranopia-3"></span></div></button>
                    <button class="modo-cor" data-modo="tritanopia"><div class="texto-cor"><h3>Tritanopia</h3><p>Azul-amarelo</p></div><div class="cores"><span class="cor tritanopia-1"></span><span class="cor tritanopia-2"></span><span class="cor tritanopia-3"></span></div></button>
                    <button class="modo-cor" data-modo="normal"><div class="texto-cor"><h3>Visão Padrão</h3><p>Cores originais</p></div><div class="cores"><span class="cor padrao-1"></span><span class="cor padrao-2"></span><span class="cor padrao-3"></span></div></button>
                    <button id="voltar" class="voltar">← Voltar</button>
                </div>
            </div>`;
        document.body.appendChild(painel);
    }

    const confirmacao = document.createElement("div");
    confirmacao.className = "confirmacao-acessibilidade";
    confirmacao.hidden = true;
    confirmacao.setAttribute("role", "dialog");
    confirmacao.setAttribute("aria-modal", "true");
    confirmacao.innerHTML = `
        <div class="confirmacao-caixa">
            <h2>Tem certeza?</h2>
            <p id="mensagemConfirmacao">Deseja mudar o modo de cores?</p>
            <div class="confirmacao-acoes">
                <button type="button" id="cancelarConfirmacao">Cancelar</button>
                <button type="button" id="aceitarConfirmacao">Confirmar</button>
            </div>
        </div>`;
    document.body.appendChild(confirmacao);

    const abrir = function (event) {
        if (event) event.preventDefault();
        painel.hidden = false;
        if (trigger.tagName === "BUTTON") trigger.style.display = "none";
    };
    const fechar = function () {
        painel.hidden = true;
        const daltonismo = document.getElementById("telaDaltonismo");
        const principal = document.getElementById("telaPrincipal");
        if (daltonismo) daltonismo.hidden = true;
        if (principal) principal.hidden = false;
        if (trigger.tagName === "BUTTON") trigger.style.display = "flex";
    };

    let arrastando = false;
    let deslocamentoX = 0;
    let deslocamentoY = 0;

    const limitarPosicao = function (valor, minimo, maximo) {
        return Math.min(Math.max(valor, minimo), Math.max(minimo, maximo));
    };

    const iniciarArraste = function (event) {
        if (event.target.closest("button")) return;

        const painelRect = painel.getBoundingClientRect();
        painel.style.transform = "none";
        painel.style.left = painelRect.left + "px";
        painel.style.top = painelRect.top + "px";
        deslocamentoX = event.clientX - painelRect.left;
        deslocamentoY = event.clientY - painelRect.top;
        arrastando = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        painel.classList.add("arrastando");
    };

    const moverPainel = function (event) {
        if (!arrastando) return;

        const painelRect = painel.getBoundingClientRect();
        const novaPosicaoX = limitarPosicao(
            event.clientX - deslocamentoX,
            0,
            window.innerWidth - painelRect.width
        );
        const novaPosicaoY = limitarPosicao(
            event.clientY - deslocamentoY,
            0,
            window.innerHeight - painelRect.height
        );

        painel.style.left = novaPosicaoX + "px";
        painel.style.top = novaPosicaoY + "px";
    };

    const terminarArraste = function () {
        arrastando = false;
        painel.classList.remove("arrastando");
    };

    painel.querySelectorAll(".cabecalho").forEach(function (cabecalho) {
        cabecalho.addEventListener("pointerdown", iniciarArraste);
        cabecalho.addEventListener("pointermove", moverPainel);
        cabecalho.addEventListener("pointerup", terminarArraste);
        cabecalho.addEventListener("pointercancel", terminarArraste);
    });

    trigger.addEventListener("click", abrir);
    document.getElementById("fechar").addEventListener("click", fechar);
    document.getElementById("fecharDaltonismo").addEventListener("click", fechar);

    document.getElementById("botaoContraste").addEventListener("click", function () {
        document.body.classList.toggle("alto-contraste");
        const ativo = document.body.classList.contains("alto-contraste");
        document.getElementById("iconeContraste").textContent = ativo ? "🌙" : "☀️";
        this.setAttribute("aria-label", ativo ? "Desativar alto contraste" : "Ativar alto contraste");
        this.setAttribute("aria-pressed", String(ativo));
    });

    let tamanhoFonte = 100;
    document.getElementById("diminuirFonte").addEventListener("click", function () {
        if (tamanhoFonte > 80) document.documentElement.style.fontSize = (tamanhoFonte -= 10) + "%";
    });
    document.getElementById("aumentarFonte").addEventListener("click", function () {
        if (tamanhoFonte < 140) document.documentElement.style.fontSize = (tamanhoFonte += 10) + "%";
    });
    document.getElementById("fonteNormal").addEventListener("click", function () {
        tamanhoFonte = 100;
        document.documentElement.style.fontSize = "100%";
    });
    document.getElementById("leituraVoz").addEventListener("click", function () {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não suporta leitura em voz.");
            return;
        }

        const areaConteudo = document.querySelector(".conteudo-site, main") || document.body;
        const conteudo = areaConteudo.cloneNode(true);

        conteudo.querySelectorAll(
            ".painel, .acessibilidade, button, script, svg"
        ).forEach(function (elemento) {
            elemento.remove();
        });

        const texto = conteudo.innerText.trim();

        if (!texto) return;

        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = "pt-BR";
        fala.rate = 1;
        fala.pitch = 1;
        speechSynthesis.cancel();
        speechSynthesis.speak(fala);
    });

    document.getElementById("abrirDaltonismo").addEventListener("click", function () {
        document.getElementById("telaPrincipal").hidden = true;
        document.getElementById("telaDaltonismo").hidden = false;
    });
    document.getElementById("voltar").addEventListener("click", function () {
        document.getElementById("telaDaltonismo").hidden = true;
        document.getElementById("telaPrincipal").hidden = false;
    });
    document.querySelectorAll(".modo-cor").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const modo = this.dataset.modo;
            const nomeModo = modo === "normal" ? "Visão Padrão" : this.querySelector("h3").textContent;
            document.getElementById("mensagemConfirmacao").textContent =
                "Deseja mudar o modo de cores para " + nomeModo + "?";
            confirmacao.hidden = false;

            const aceitar = document.getElementById("aceitarConfirmacao");
            const cancelar = document.getElementById("cancelarConfirmacao");

            const fecharConfirmacao = function () {
                confirmacao.hidden = true;
                aceitar.removeEventListener("click", aplicarModo);
                cancelar.removeEventListener("click", fecharConfirmacao);
            };

            const aplicarModo = function () {
                document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
                if (modo !== "normal") document.body.classList.add(modo);
                document.getElementById("telaDaltonismo").hidden = true;
                document.getElementById("telaPrincipal").hidden = false;
                fecharConfirmacao();
            };

            aceitar.addEventListener("click", aplicarModo);
            cancelar.addEventListener("click", fecharConfirmacao);
        });
    });
})();
