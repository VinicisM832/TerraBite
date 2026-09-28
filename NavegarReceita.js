const receitas = [
    {imagem:"pictures/sucoverde.png",
    alt:"Suco Verde",
    site:"",
    nome:"Suco Verde com Folhas de Cenoura",
    descrição:"Bebida leve aproveitando os talos nutritivos da cenoura.",
    ingredientes:"Folhas de cenoura",
    tempo:20,
    nota:3.0},

    {imagem:"pictures/bolobeterraba.png",
    alt:"Bolo de Talos Beterraba",
    site:"receita.html",
    nome:"Bolo de Talos Beterraba",
    descrição:"Bolo de chocolate úmido aproveitando talos de beterraba",
    ingredientes:"Talo de beterraba",
    tempo:60,
    nota:4.5},

    {imagem:"pictures/Geleia.png",
    alt:"Receita",
    site:"",
    nome:"Geleias de Casca de Frutas",
    descrição:"Geleia doce aproveitando cascas de maçã, pera e pêssego",
    ingredientes:"Cascas de maçã",
    tempo:90,
    nota:5.0},

    {imagem:"pictures/farofa.png",
    alt:"Receita",
    site:"",
    nome:"Farofa Nutritiva de Talos",
    descrição:"Receita sustentável que aproveita talos de couve, brócolis e agrião.",
    ingredientes:"Talos de couve",
    tempo:30,
    nota:4.0},

    {imagem:"pictures/risoto.png",
    alt:"Receita",
    site:"",
    nome:"Risoto de Talos de Espinafre",
    descrição:"Risoto cremoso e nutritivo com talos de espinafre.",
    ingredientes:"Folhas de Cenoura",
    tempo:30,
    nota:4.5},

    {imagem:"pictures/salada2.png",
    alt:"Receita",
    site:"",
    nome:"Bowl de Frango com Legumes e Grãos",
    descrição:"Receita com frango, repolho e folhas verdes.",
    ingredientes:"Folhas de repolho",
    tempo:15,
    nota:3.5}
];

const lista = document.getElementById("grid-receitas");

if (receitas.length === 0) {
    lista.innerHTML = "<p>Nenhuma receita cadastrada.</p>";
} 

else {
    receitas.forEach(receitas=>{
        lista.innerHTML += `
        <a class="card-receita" href="${receitas.site}">
        
            <img src="${receitas.imagem}" alt:"${receitas.alt}">

            <h3>${receitas.nome}</h3>

            <p class="descricao">${receitas.descrição}</p>

            <div class="tags">
                <span>${receitas.ingredientes}</span>
            </div>

            <div class="info">
                <div>
                    <img src="icons/relógio.png" alt="Tempo">
                    <span>${receitas.tempo} min</span>
                </div>

                <div>
                    <img src="pictures/estrela.png" alt="Estrela">
                    <span>${receitas.nota.toFixed(1)}</span>
                </div>
            </div>
        </a>
        `;
    }); 
}

/*<script>
    (function () {
        const chave = "terraBiteReceitasVisitadas";
        const cards = document.querySelectorAll("[data-receita]");
        let visitadas = [];

        try {
            visitadas = JSON.parse(localStorage.getItem(chave)) || [];
        } catch (erro) {
            visitadas = [];
        }

        cards.forEach(function (card) {
            const id = card.dataset.receita;

            card.appendChild(window.TerraBiteSalvas.criarBotao({
                id: id,
                titulo: card.querySelector("h3").textContent,
                imagem: card.querySelector("img").src
            }));

            if (visitadas.includes(id)) {
                card.classList.add("receita-visitada");
            }

            card.addEventListener("click", function () {
                if (!visitadas.includes(id)) visitadas.push(id);

                try {
                    localStorage.setItem(chave, JSON.stringify(visitadas));
                } catch (erro) {
                    card.classList.add("receita-visitada");
                }

                if (card.tagName !== "A") {
                    window.location.href = "receita.html?receita=" + encodeURIComponent(id);
                }
            });
        });
    })();
</script> */