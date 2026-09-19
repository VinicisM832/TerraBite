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

(function criarChatMagali() {
    if (document.getElementById("chatMagali")) return;

    const trigger = document.querySelector(".acessibilidade") || document.getElementById("abrirPainel");
    if (!trigger) return;

    const chat = document.createElement("aside");
    chat.id = "chatMagali";
    chat.className = "chat-magali";
    chat.hidden = true;
    chat.setAttribute("aria-label", "Chat com Magali");
    chat.innerHTML = `
        <header class="chat-magali-cabecalho">
            <div class="chat-magali-avatar" aria-hidden="true">M</div>
            <div><strong>Magali</strong><span>Assistente do Terra Bite</span></div>
            <button type="button" class="chat-magali-fechar" aria-label="Fechar chat">×</button>
        </header>
        <div class="chat-magali-mensagens" aria-live="polite"></div>
        <form class="chat-magali-form">
            <label class="sr-only" for="chatMagaliEntrada">Mensagem para Magali</label>
            <input id="chatMagaliEntrada" type="text" maxlength="240" placeholder="Pergunte sobre o Terra Bite..." autocomplete="off">
            <button type="submit" aria-label="Enviar mensagem">➤</button>
        </form>`;
    document.body.appendChild(chat);

    const mensagens = chat.querySelector(".chat-magali-mensagens");
    const entrada = chat.querySelector("#chatMagaliEntrada");
    const adicionarMensagem = function (texto, autor) {
        const mensagem = document.createElement("p");
        mensagem.className = "chat-magali-mensagem " + autor;
        mensagem.textContent = texto;
        mensagens.appendChild(mensagem);
        mensagens.scrollTop = mensagens.scrollHeight;
    };
    const responder = function (texto) {
        const busca = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const contem = function () {
            return Array.from(arguments).some(function (termo) { return busca.includes(termo); });
        };

        if (/(^|\s)(oi|ola|olá|bom dia|boa tarde|boa noite)(\s|$)/i.test(texto)) {
            return "Oi! Eu sou a Magali. Posso tirar dúvidas sobre receitas, dar dicas de cozinha e explicar como usar o Terra Bite.";
        }
        if (contem("como voce funciona", "o que voce faz", "ajuda")) {
            return "Posso orientar sobre ingredientes, preparo, conservação e aproveitamento de alimentos. Também explico busca, perfil, comunidade, receitas salvas e acessibilidade.";
        }
        if (contem("melhor receita", "melhores receitas", "receita mais gostosa", "receita recomendada", "qual receita voce recomenda")) {
            return "As melhores receitas do site, considerando as avaliações, são: Risoto de Talos de Espinafre, nota 4,8; Bolo de Talos de Beterraba, nota 4,7; Suco Verde com Folhas de Cenoura, nota 4,6; Farofa Nutritiva de Talos, nota 4,6; Geleia de Cascas de Frutas, nota 4,5; e Bowl de Frango com Legumes e Grãos, nota 4,5. Você pode abrir qualquer uma pela busca ou pela página Navegar Receitas.";
        }
        if (contem("qual receita", "quais receitas", "tem receita", "receitas disponiveis")) {
            return "Temos suco verde com folhas de cenoura, bolo de talos de beterraba, geleia de cascas de frutas, farofa de talos, risoto de talos de espinafre e bowl de frango com legumes e grãos.";
        }
        if (contem("suco verde", "folha de cenoura")) {
            return "O suco verde aproveita folhas de cenoura, maçã, couve, limão e água gelada. Bata tudo no liquidificador e coe apenas se preferir uma bebida mais leve.";
        }
        if (contem("bolo", "beterraba")) {
            return "No bolo de talos de beterraba, bata os talos com os ingredientes líquidos, misture os secos e coloque o fermento por último. Asse em forno preaquecido a 180 °C.";
        }
        if (contem("geleia", "casca", "cascas")) {
            return "As cascas de maçã, pera e pêssego podem virar geleia. Lave bem, cozinhe com água e açúcar e finalize com limão quando a mistura engrossar.";
        }
        if (contem("farofa", "talos")) {
            return "Para a farofa, pique os talos pequenos, refogue com cebola, junte a farinha de mandioca e tempere com sal e cheiro-verde.";
        }
        if (contem("risoto", "espinafre")) {
            return "No risoto, mantenha o caldo de legumes aquecido e acrescente aos poucos, mexendo sempre. Os talos de espinafre entram durante o cozimento.";
        }
        if (contem("substituir", "substituicao", "trocar ingrediente")) {
            return "Você pode adaptar as receitas: maçã pode ser trocada por abacaxi ou laranja no suco, e os grãos do bowl podem ser arroz integral, quinoa ou feijão.";
        }
        if (contem("guardar", "conservar", "geladeira", "validade")) {
            return "Guarde preparos frios em recipiente limpo e fechado na geladeira. Espere o alimento esfriar antes de tampar e confira cheiro e aparência antes de consumir.";
        }
        if (contem("salvar", "salva", "favorito", "bandeira")) {
            return "Para salvar uma receita, abra o cartão ou a página dela e clique na bandeira. Depois você encontra tudo na seção Receitas salvas do seu Perfil.";
        }
        if (contem("buscar", "pesquisar", "barra de pesquisa")) {
            return "Digite o nome ou um ingrediente na barra de pesquisa, como talos, cascas, beterraba ou frango. Ao escolher uma sugestão, você vai direto para a receita.";
        }
        if (contem("publicar", "publiquei", "postar")) {
            return "Para publicar, entre no Perfil, preencha nome, descrição, ingredientes e modo de preparo. Na Comunidade, outras pessoas poderão ler, comentar e avaliar.";
        }
        if (contem("comunidade", "comentar", "avaliar")) {
            return "Na Comunidade você pode conhecer receitas, filtrar por tema, comentar e dar estrelas. Para publicar uma receita completa, use seu Perfil.";
        }
        if (contem("acessibilidade", "voz", "imagem", "contraste", "daltonismo")) {
            return "O botão de acessibilidade oferece leitura em voz, leitura por apontamento de textos e imagens, ajuste de fonte, alto contraste e modos de daltonismo.";
        }
        if (contem("perfil", "cadastro", "conta")) {
            return "No Perfil você pode editar seus dados, publicar receitas, acompanhar o histórico, ver avaliações e acessar suas receitas salvas.";
        }
        if (contem("desperdicio", "aproveitamento", "talos", "sementes", "folhas")) {
            return "A melhor dica é higienizar bem as partes aproveitáveis, retirar partes estragadas e usar talos, folhas, cascas e sementes em caldos, farofas, bolos e bebidas.";
        }
        return "Não encontrei essa informação ainda. Tente perguntar sobre uma receita, ingrediente, substituição, conservação, receitas salvas, comunidade ou acessibilidade.";
    };

    const abrir = function () {
        chat.hidden = false;
        if (!mensagens.children.length) adicionarMensagem("Oi! Eu sou a Magali. Como posso ajudar no Terra Bite?", "magali");
        entrada.focus();
    };
    const fechar = function () { chat.hidden = true; };
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "chat-magali-botao";
    botao.setAttribute("aria-label", "Conversar com Magali");
    botao.title = "Conversar com Magali";
    botao.innerHTML = "💬<span>Magali</span>";
    document.body.appendChild(botao);
    botao.addEventListener("click", abrir);
    chat.querySelector(".chat-magali-fechar").addEventListener("click", fechar);
    chat.querySelector(".chat-magali-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const texto = entrada.value.trim();
        if (!texto) return;
        adicionarMensagem(texto, "usuario");
        entrada.value = "";
        window.setTimeout(function () { adicionarMensagem(responder(texto), "magali"); }, 250);
    });
})();

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
                    <button id="leituraImagens" class="card-opcao"><div class="icone-opcao">🖼</div><h3>Leitura de Imagens</h3><p>Ouvir a descrição das imagens</p></button>
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

    const opcoesPainel = painel.querySelector(".opcoes");
    if (opcoesPainel && !document.getElementById("leituraImagens")) {
        opcoesPainel.insertAdjacentHTML("afterbegin", '<button id="leituraImagens" class="card-opcao"><div class="icone-opcao">🖼</div><h3>Leitura de Imagens</h3><p>Ouvir a descrição das imagens</p></button>');
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

        const falar = function () {
            const fala = new SpeechSynthesisUtterance(texto);
            const voz = obterVozHumana();
            fala.lang = "pt-BR";
            fala.voice = voz;
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

    let leituraImagensAtiva = false;
    let elementoSobCursor = null;
    const botaoLeituraImagens = document.getElementById("leituraImagens");
    const areaImagens = document.querySelector(".conteudo-site, main") || document.body;

    function obterDescricaoImagem(imagem) {
        const legenda = imagem.closest("figure")?.querySelector("figcaption")?.textContent.trim();
        const descricao = imagem.getAttribute("alt")?.trim() || imagem.getAttribute("title")?.trim() || legenda;
        return descricao && descricao.toLowerCase() !== "imagem" ? descricao : "";
    }

    function falarDescricaoImagem(imagem) {
        if (!leituraImagensAtiva || !("speechSynthesis" in window)) return;
        const descricao = obterDescricaoImagem(imagem);
        if (!descricao) return;

        const falar = function () {
            const fala = new SpeechSynthesisUtterance(descricao);
            fala.lang = "pt-BR";
            fala.voice = obterVozHumana();
            fala.rate = 0.82;
            fala.pitch = 0.55;
            fala.volume = 0.7;
            speechSynthesis.cancel();
            speechSynthesis.speak(fala);
        };

        if (speechSynthesis.getVoices().length) falar();
        else speechSynthesis.addEventListener("voiceschanged", falar, { once: true });
    }

    function falarTextoSobCursor(elemento) {
        if (!leituraImagensAtiva || !elemento || painel.contains(elemento)) return;

        const imagem = elemento.closest("img");
        const elementoTexto = imagem ? null : elemento.closest("h1, h2, h3, h4, h5, h6, p, li, a, label, figcaption, strong, span, small");
        const alvo = imagem || elementoTexto;
        if (!alvo || alvo === elementoSobCursor) return;

        elementoSobCursor = alvo;
        const texto = imagem ? obterDescricaoImagem(imagem) : alvo.textContent.trim().replace(/\s+/g, " ");
        if (!texto) return;

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

        if (speechSynthesis.getVoices().length) falar();
        else speechSynthesis.addEventListener("voiceschanged", falar, { once: true });
    }

    areaImagens.querySelectorAll("img").forEach(function (imagem) {
        imagem.addEventListener("focus", function () {
            falarDescricaoImagem(imagem);
        });
        if (!imagem.hasAttribute("tabindex") && obterDescricaoImagem(imagem)) imagem.tabIndex = 0;
    });

    document.addEventListener("pointermove", function (event) {
        if (!leituraImagensAtiva) return;
        falarTextoSobCursor(document.elementFromPoint(event.clientX, event.clientY));
    });

    botaoLeituraImagens.addEventListener("click", function () {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não suporta leitura em voz.");
            return;
        }

        leituraImagensAtiva = !leituraImagensAtiva;
        elementoSobCursor = null;
        this.classList.toggle("ativo", leituraImagensAtiva);
        this.setAttribute("aria-pressed", String(leituraImagensAtiva));
        this.querySelector("p").textContent = leituraImagensAtiva
            ? "Passe a seta sobre uma imagem"
            : "Ouvir a descrição das imagens";
        speechSynthesis.cancel();
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
