const cards = document.querySelectorAll('.card');
const score = document.getElementById('puntos');
const attempt = document.getElementById('error');
const restart = document.querySelectorAll("button");
const ouh = document.getElementById('ouh');
const nerd = document.getElementById('nerd')

let cardReturn = false;
let cardOne;
let cardTwo;
let cardBlock = false;
let points = 0;
let err = 0;
let hits = 0;





function turnCard() {
     if(cardBlock) return;
    this.classList.add('flip');
    if (!cardReturn) {
        cardReturn = true;
        cardOne = this;
    } else {
        cardReturn = false;
        cardTwo = this;

        compareCards();
    }
}

restart.forEach((button) => button.addEventListener("click", starGame));

function starGame() {
    points = 0;
    err = 0;
    attempt.innerHTML = err;
    score.innerHTML = points;
    mixCards(cards);
    cards.forEach(carta => carta.classList.remove('flip'));
    cards.forEach(carta => carta.addEventListener('click', turnCard));
    document.getElementById('vent-juego').style.display = "none";
    document.getElementById('vent-perdedor').style.display = "none";
    document.getElementById('vent-ganador').style.display = "none";
};


function mixCards(cards) {

    cards.forEach(card => {
        let aleatorio = Math.floor(Math.random() * 10) + 1;
        card.style.order = aleatorio;
    });

};



function compareCards() {

    if (cardOne.dataset.choice === cardTwo.dataset.choice) {
        cardOne.removeEventListener('click', turnCard);
        cardTwo.removeEventListener('click', turnCard);
        nerd.play();
        addPoints();
    } else {
        cardBlock = true;
        setTimeout(() => {
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');
            ouh.play();
            cardBlock = false;
            addAttempts();
        }, 1000);
    }
}

function winGame() {
    if (points === 100) {
        console.log('GANO EL JUEGO');
        document.getElementById('vent-ganador').style.display = "block";
    }
}

function addPoints() {

    points = points + 10;
    score.innerHTML = points;
    console.log(points);
    winGame();
}


function addAttempts() {
    err = err + 1;
    attempt.innerHTML = err;
    console.log(err);
    gameOver();
}

function gameOver() {
    if (err === 5) {
        document.getElementById('vent-perdedor').style.display = "block";
    }
}


