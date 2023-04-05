/* Variável global que armazena a quantidade total de cartas do jogo */
let numCards;

/* Array global que armazena a quantidade de cartas do jogo */
let cardsList = [];

/* Variável global que armazena a quantidade de clicks por rodada */
let numClicks = 0;

/* Flags globais para verificar cartas selecionadas */
let firstSelectedCard = null;
let secondSelectedCard = null;

const parrotCardImgs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot",
                        "revertitparrot", "tripletsparrot", "unicornparrot"];

startGame();

function startGame() {

    let gameStart = false;

    while (!gameStart) {

        numCards = Number(prompt("Com quantas cartas você quer jogar?"));
    
        /*  Verifica se o valor de entrada do prompt é um numero inteiro  */
        if (!Number.isInteger(numCards)) {
            continue;
        }
     
         /*  Verifica se o numero de cartas é impar ou se a quantidade de 
          *  cartas é menor que 4 ou maior que 14  */
        if (numCards % 2 == 1 || (numCards < 4 || numCards > 14)) {
            continue;
        }
    
        gameStart = true;
    }
    createCards();
}

function createCards() {
 
    const main = document.querySelector(".main");
    const maxNumParrotCardImg = 2;
    const maxNumCardsInContainer = 6;

    let parrotCardImgIndex = -1;
    let counter = 0;
    let content;

    while (counter < numCards) {

        /* Verifica se a quantidade de cartas ultrapassou o limite de cartas por container */
        if (counter % maxNumCardsInContainer == 0) {
            content = `<div class="cards-container">`;
        }

        /* Atualiza o indice para criação das imagens de verso */
        if (counter % maxNumParrotCardImg == 0) {
            parrotCardImgIndex++;
        }

        let parrotCardImg = parrotCardImgs[parrotCardImgIndex];

        content += `<div class="card" onclick="selectCard(this)">`;
        content += `<div class="front-face face">`;
        content += `<img src="./assets/images/cards/back.png" alt="frontparrot" title="frontparrot"></div>`;
        content += `<div class="back-face face ${parrotCardImg}">`;
        content += `<img src="./assets/images/cards/${parrotCardImg}.gif" alt="${parrotCardImg}" title="${parrotCardImg}"></div>`;
        content += `</div>`;

        counter++;

        /* Fechar div de "cards-container" e atribuir o conteúdo para main */
        if ((counter >= numCards) || (counter % maxNumCardsInContainer == 0)) {
            content += `</div>`;
            main.innerHTML += content;
        }
    }
    showCards();
}

function shuffle() {

    /*  Função embaralha as cartas de forma pseudo-aleatória */
    return Math.random() - 0.5;
}

function showCards() {

    const cardsContainer = document.querySelectorAll(".cards-container");

    /*  Armazena as cartas selecionadas em cardsList */
    for (let i = 0; i < cardsContainer.length; i++) {

        let cards = cardsContainer[i].querySelectorAll(".card");
        for (let j = 0; j < cards.length; j++) {

            cardsList.push(cards[j]);
            cardsContainer[i].removeChild(cardsContainer[i].firstChild);
        }
    }

    /*  Embaralha as cartas selecionadas */
    cardsList.sort(shuffle);

    const maxNumCardsInContainer = 6;

    let cardContainerIndex = -1;
    let counter = 0;

    /*  Mostra as cartas selecionadas */
    while (counter < numCards) {

        if (counter % maxNumCardsInContainer == 0) {
            cardContainerIndex++;
        }
        
        cardsContainer[cardContainerIndex].appendChild(cardsList[counter]);
        counter++;
    }
    cardsList = [];
}

function selectCard(selector) {

    /* Verifica se usuário clicou na mesma carta da rodada passada ou se a carta já está virada */
    if (firstSelectedCard == selector || selector.classList.contains("right-card")) {
        return;
    }

    numClicks++;

    if (firstSelectedCard == null) {
        firstSelectedCard = selector;
        return;
    }

    secondSelectedCard = selector;

    const backFirstCard = firstSelectedCard.querySelector(".back-face");
    const backSecondCard = secondSelectedCard.querySelector(".back-face");
    const classLen = backSecondCard.classList.length;

    /* Verifica se as cartas selecionadas possuem a mesma classe */
    if (backFirstCard.classList.contains(backSecondCard.classList[classLen - 1])) {
        
        firstSelectedCard.classList.add("right-card");
        secondSelectedCard.classList.add("right-card");

        cardsList.push(firstSelectedCard);
        cardsList.push(secondSelectedCard);
    } 

    firstSelectedCard = null;
    secondSelectedCard = null;

    checkIfGameEnded();
}

function checkIfGameEnded() {

    if (cardsList.length < numCards) {
        return;
    }
    alert(`Você ganhou em ${numClicks} jogadas!`);
}