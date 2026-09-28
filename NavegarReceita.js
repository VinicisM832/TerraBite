const receitas = [
    {id:"suco-verde",
    imagem:"pictures/sucoverde.png",
    alt:"Suco Verde",
    site:"receita.html?receita=suco-verde",
    nome:"Suco Verde com Folhas de Cenoura",
    descrição:"Bebida leve aproveitando os talos nutritivos da cenoura.",
    ingredientes:"Folhas de cenoura",
    tempo:20,
    nota:3.0},

    {id:"bolo-talhos-beterraba",
    imagem:"pictures/bolobeterraba.png",
    alt:"Bolo de Talos Beterraba",
    site:"receita.html?receita=bolo-talhos-beterraba",
    nome:"Bolo de Talos Beterraba",
    descrição:"Bolo de chocolate úmido aproveitando talos de beterraba",
    ingredientes:"Talo de beterraba",
    tempo:60,
    nota:4.5},

    {id:"geleia-cascas-frutas",
    imagem:"pictures/Geleia.png",
    alt:"Receita",
    site:"receita.html?receita=geleia-cascas-frutas",
    nome:"Geleias de Casca de Frutas",
    descrição:"Geleia doce aproveitando cascas de maçã, pera e pêssego",
    ingredientes:"Cascas de maçã",
    tempo:90,
    nota:5.0},

    {id:"farofa-talos",
    imagem:"pictures/farofa.png",
    alt:"Receita",
    site:"receita.html?receita=farofa-talos",
    nome:"Farofa Nutritiva de Talos",
    descrição:"Receita sustentável que aproveita talos de couve, brócolis e agrião.",
    ingredientes:"Talos de couve",
    tempo:30,
    nota:4.0},

    {id:"risoto-talos-espinafre",
    imagem:"pictures/risoto.png",
    alt:"Receita",
    site:"receita.html?receita=risoto-talos-espinafre",
    nome:"Risoto de Talos de Espinafre",
    descrição:"Risoto cremoso e nutritivo com talos de espinafre.",
    ingredientes:"Folhas de Cenoura",
    tempo:30,
    nota:4.5},

    {id:"bowl-frango-legumes",
    imagem:"pictures/salada2.png",
    alt:"Receita",
    site:"receita.html?receita=bowl-frango-legumes",
    nome:"Bowl de Frango com Legumes e Grãos",
    descrição:"Receita com frango, repolho e folhas verdes.",
    ingredientes:"Folhas de repolho",
    tempo:15,
    nota:3.5}
];

const lista = document.getElementById("grid-receitas");
const chaveReceitasVisitadas = "terraBiteReceitasVisitadas";
let receitasVisitadas = [];

try {
    const salvas = JSON.parse(localStorage.getItem(chaveReceitasVisitadas));
    receitasVisitadas = Array.isArray(salvas) ? salvas : [];
} catch (erro) {
    receitasVisitadas = [];
}

if (receitas.length === 0) {
    lista.innerHTML = "<p>Nenhuma receita cadastrada.</p>";
} 

else {
    receitas.forEach(receita=>{
        const card = document.createElement("a");
        card.className = "card-receita";
        card.href = receita.site;
        card.dataset.receita = receita.id;
        card.innerHTML = `
        
            <img src="${receita.imagem}" alt="${receita.alt}">

            <h3>${receita.nome}</h3>

            <p class="descricao">${receita.descrição}</p>

            <div class="tags">
                <span>${receita.ingredientes}</span>
            </div>

            <div class="info">
                <div>
                    <img src="icons/relógio.png" alt="Tempo">
<<<<<<< HEAD
                    <span>${receitas.tempo} min</span>
=======
                    <span>${receita.tempo}</span>
>>>>>>> 64fce45ff44f3f2217fce12d85f9cb7e6cc4d43c
                </div>

                <div>
                    <img src="pictures/estrela.png" alt="Estrela">
<<<<<<< HEAD
                    <span>${receitas.nota.toFixed(1)}</span>
=======
                    <span>${receita.nota}</span>
>>>>>>> 64fce45ff44f3f2217fce12d85f9cb7e6cc4d43c
                </div>
            </div>
        `;
        if (receitasVisitadas.includes(receita.id)) {
            card.classList.add("receita-visitada");
        }

        card.addEventListener("click", function () {
            if (!receitasVisitadas.includes(receita.id)) {
                receitasVisitadas.push(receita.id);
            }

            card.classList.add("receita-visitada");

            try {
                localStorage.setItem(chaveReceitasVisitadas, JSON.stringify(receitasVisitadas));
            } catch (erro) {
                // O selo continua visível durante a sessão mesmo sem armazenamento.
            }
        });

        lista.appendChild(card);
    });
}
