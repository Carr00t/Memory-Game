const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard; 
let secondCard;

let secs = 0;
let mins = 0;
let hrs = 0;
let displaySecs = 0;
let displayMins = 0;
let displayHrs = 0;
let interval;
let stopwatch = document.getElementById("stopwatch");
let startBtn = document.getElementById("start-btn");
let numOfCardsFlipped = 0;
let container = document.querySelector('#container');
let gameScreen = document.querySelector('#game-screen');


function start() {
  startBtn.disabled = true;
  startBtn.innerHTML = 'Start Game';
  cards.forEach(card => card.classList.remove('flip'));
  secs = 0;
  mins = 0;
  hrs = 0;
  displaySecs = '00';
  displayMins = '00';
  displayHrs = '00';

  function flipCard() {
    if (lockBoard) {
      return;
    }
    if (this === firstCard) {
      return;
    }
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
  
      return;
    }
  
    secondCard = this;
  
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.cardname === secondCard.dataset.cardname;
  
    if (isMatch) {
      disableCards();
      numOfCardsFlipped++;
    } else unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1500);
  }
  
  function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }
  
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();
  
  cards.forEach(card => card.addEventListener('click', flipCard));
   
  interval = setInterval(interval, 1000);

  function interval() {
    stopWatch();
    gameOverCheck();
  }

  function gameOverCheck() {
    if (numOfCardsFlipped == 12) {
      console.log('all cards flipped');
      clearInterval(interval);
      startBtn.disabled = false;
      startBtn.innerHTML = 'Restart Game';
      numOfCardsFlipped = 0;
    }
  } 
}

function stopWatch() {
  startBtn.disabled = true;

  secs++;
  if (secs / 60 === 1) {
    secs = 0;
    mins++;
  }
  if (mins / 60 === 1) {
    mins = 0;
    hrs++;
  }

  if (secs < 10) {
    displaySecs = '0' + secs.toString();
  } else {
    displaySecs = secs;
  }

  if (mins < 10) {
    displayMins = '0' + mins.toString();
  } else {
    displayMins = mins;
  }

  if (hrs < 10) {
    displayHrs = '0' + hrs.toString();
  } else {
    displayHrs = hrs.toString();
  }

  stopwatch.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
}

