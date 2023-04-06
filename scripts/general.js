/* Variável global que armazena a quantidade total de cartas do jogo */
let numCards;

/* Array global que armazena a quantidade de cartas do jogo */
let cardsList = [];

/* Variável global que armazena a quantidade de clicks por rodada */
let numClicks = 0;

/* Flags globais para verificar cartas selecionadas */
let firstSelectedCard, secondSelectedCard;
let frontFirstCard, backFirstCard;
let frontSecondCard, backSecondCard;

/* Flag para impedir que o usuário selecione uma terceira carta enquanto 
 * duas cartas diferentes estão sendo desviradas */
let waitFlipCards = false;

resetSelectedCards();
startGame();

function resetSelectedCards() {

    firstSelectedCard = null;
    secondSelectedCard = null;
    frontFirstCard = null;
    backFirstCard = null;
    frontSecondCard = null;
    backSecondCard = null;
}

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

function shuffle() {

    /*  Função embaralha as cartas de forma pseudo-aleatória */
    return Math.random() - 0.5;
}

function createCards() {
 
    const main = document.querySelector(".main");
    const parrotCardImgs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot",
                            "revertitparrot", "tripletsparrot", "unicornparrot"];

    const cards = [];

    for (let i = 0; i < numCards / 2; i++) {
        cards.push(parrotCardImgs[i]);
        cards.push(parrotCardImgs[i]);
    }

    /* Embaralha as cartas */
    cards.sort(shuffle);

    const maxNumCardsInContainer = 6;
    let counter = 0;
    let content;

    while (counter < numCards) {

        /* Verifica se a quantidade de cartas ultrapassou o limite de cartas por container */
        if (counter % maxNumCardsInContainer == 0) {
            content = `<div class="cards-container">`;
        }
        
        /* Variável seleciona a primeira carta e remove o primeiro elemento do Array */
        let parrotCardImg = cards[0];
        cards.shift();

        content += `<div class="card" onclick="selectCard(this)">`;
        content += `<div class="face">`;
        content += `<img src="./assets/images/cards/back.png" alt="frontparrot" title="frontparrot"></div>`;
        content += `<div class="back-face face">`;
        content += `<img class="${parrotCardImg}" src="./assets/images/cards/${parrotCardImg}.gif"`;
        content += `alt="${parrotCardImg}" title="${parrotCardImg}"></div></div>`;

        counter++;

        /* Fechar div de "cards-container" e atribuir o conteúdo para main */
        if ((counter >= numCards) || (counter % maxNumCardsInContainer == 0)) {
            content += `</div>`;
            main.innerHTML += content;
        }
    } 
}

function flipCards() {

    backFirstCard.classList.toggle("back");
    backSecondCard.classList.toggle("back");
    frontFirstCard.classList.toggle("front");
    frontSecondCard.classList.toggle("front");
    waitFlipCards = false;
}

function selectCard(selector) {

    if (!waitFlipCards) {

        if (secondSelectedCard != null) {
            resetSelectedCards();
        }
    
        /* Verifica se usuário clicou na mesma carta da rodada passada ou se a carta já está virada */
        if (firstSelectedCard == selector || selector.classList.contains("correct-card")) {
            return;
        }
    
        numClicks++;
    
        if (firstSelectedCard == null) {

            firstSelectedCard = selector;
            frontFirstCard = firstSelectedCard.querySelector(".face");
            backFirstCard = firstSelectedCard.querySelector(".back-face");

            frontFirstCard.classList.toggle("front");
            backFirstCard.classList.toggle("back");
            return;
        }
    
        secondSelectedCard = selector;
        frontSecondCard = secondSelectedCard.querySelector(".face");
        backSecondCard = secondSelectedCard.querySelector(".back-face");

        frontSecondCard.classList.toggle("front");
        backSecondCard.classList.toggle("back");
    
        const backFirstImg = backFirstCard.querySelector("img").classList[0];
        const backSecondImg = backSecondCard.querySelector("img").classList[0];
    
        /* Verifica se as cartas selecionadas possuem a mesma classe */
        if (backFirstImg === backSecondImg) {
            
            firstSelectedCard.classList.add("correct-card");
            secondSelectedCard.classList.add("correct-card");
            cardsList.push(firstSelectedCard);
            cardsList.push(secondSelectedCard);
            setTimeout(checkIfGameEnded, 1000);
        }
        else {
            waitFlipCards = true;
            setTimeout(flipCards, 500);
        } 
    }
}

function checkIfGameEnded() {

    if (cardsList.length < numCards) {
        return;
    }
    alert(`Você ganhou em ${numClicks} jogadas!`);

    while (true) {

        let msg = prompt("Gostaria de jogar novamente?");

        if (msg == "sim") {

            /* Reiniciar HTML, limpar lista e número de clicks */
            const main = document.querySelector(".main");
            main.innerHTML = "";

            cardsList = [];
            numClicks = 0;
            
            resetSelectedCards();
            startGame();
            return;
        }

        if (msg == "não") {
            return;
        }
    }
}