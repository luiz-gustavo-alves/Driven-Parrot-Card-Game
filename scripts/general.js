/* Variável global que armazena a quantidade total de cartas por jogo */
let numCards;

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
         *  cartas é menor que 4 ou maior que 14  
         */
        if (numCards % 2 == 1 || (numCards < 4 || numCards > 14)) {
            continue;
        }
    
        gameStart = true;
    }
    showCards();
}

function showCards() {

    const main = document.querySelector(".main");

    /* Numero de cartas máxima para cada cardContainer */
    const maxNumCards = 6;

    let counter = 0;
    for (let i = 0; i < main.children.length; i++) {

        let cardContainer = main.children[i];
        
        for (let j = 0; j < maxNumCards; j++) {

            cardContainer.children[j].classList.remove("hidden");
            counter++;

            if (counter >= numCards) {
                return;
            }
        }
    }
}