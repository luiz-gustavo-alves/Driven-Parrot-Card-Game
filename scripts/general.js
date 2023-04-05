/* Variável global que armazena a quantidade total de cartas do jogo */
let numCards;

/* Array global que armazena o conteudo das cartas do jogo */
let cardsList = [];

const cardContainer = document.querySelectorAll(".cards-container");
const maxNumberCardsContainer = cardContainer[0].children.length;
console.log(maxNumberCardsContainer);

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
    selectCards();
}

function selectCards() {
 
    /* Função seleciona e armazena as cartas que serão utilizadas no jogo */

    let counter = 0;
    for (let i = 0; i < cardContainer.length; i++) {

        let cards = cardContainer[i].querySelectorAll(".card");
        
        for (let j = 0; j < cards.length; j++) {

            cardsList.push(cards[j]);
            counter++;

            cardContainer[i].removeChild(cardContainer[i].children[0]);

            if (counter >= numCards) {

                cardsList.sort(shuffle);
                showCards();
                return;
            }
        }
    }
}

function shuffle() {

    /*  Função embaralha as cartas de forma pseudo-aleatória */
    return Math.random() - 0.5;
}

function showCards() {

    /* Função remove a classe hidden e mostra as cartas na tela do usuário */

    let counter = 0;
    for (let i = 0; i < cardContainer.length; i++) {
        
        for (let j = 0; j < maxNumberCardsContainer; j++) {

            cardsList[counter].classList.remove("hidden");
            cardContainer[i].appendChild(cardsList[counter]);
            counter++;
            
            if (counter >= numCards) {
                return;
            }
        }
    }
}
