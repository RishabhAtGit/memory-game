/*
 * Create a list that holds all of your cards
 */

/*
 * Variables Involved
 */

// list of cards
const listOfCards = ['fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-anchor',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-bomb',
  'fa fa-bolt',
  'fa fa-bicycle',
  'fa fa-paper-plane-o',
  'fa fa-cube',
  'fa fa-leaf',
  'fa fa-bomb'
];

let shuffledListOfCards = []; //list of shuffled cards
let oldListOfCards = []; //list of cards from the web page
const cardsDeck = document.querySelector('.deck');
let openCards = []; // store the cards which are flipped
let moves = 0; // count moves
let time = 0; // record time
let timerStatus = false; // store timer status
let clockId = 0;
const move = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars li');
const reset = document.querySelector('.restart');
let matchedPairs = 0; //record number of matched pairs
let starCounter = 0; // record number of stars
const totalPairs = 8; // stores total no .of pairs present on the board
const playAgain = document.querySelector('.play-again');
const cancel = document.querySelector('.cancel');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * Function involved
 */

// function to Place cards on board
function setUpBoard() {
  shuffledListOfCards = shuffle(listOfCards);
  oldListOfCards = document.querySelectorAll('.card i');
  let i = 0;
  for (card of oldListOfCards) {
    card.className = shuffledListOfCards[i++];
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//function for matching pair of cards
function matchCards() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    toggleCards(openCards[0]);
    toggleCards(openCards[1]);
    openCards = [];
    ++matchedPairs;
  } else {
    setTimeout(function() {
      toggleCards(openCards[0]);
      toggleCards(openCards[1]);
      openCards = [];
    }, 500);

  }
  // finish condition
  if (matchedPairs === totalPairs) {
    stopTimer();
    setTimeout(function() {
      setStatisticsOnModal();
      toggleCongratulationsModal();
      matchedPairs = 0;
    }, 500);
  }
}
// function to toggle cards
function toggleCards(clickedCard) {
  clickedCard.classList.toggle('open');
  clickedCard.classList.toggle('show');
}
// function to count moves
function movesCounter() {
  ++moves;
  move.innerHTML = moves;
}
//function to provide star rating
function calculateStarRating() {
  let count = 0;
  if (moves <= 18) {
    count = 0;
    starCounter = 3;
  } else if (moves > 18 && moves <= 36) {
    count = 1;
    starCounter = 2;
  } else {
    count = 2;
    starCounter = 1;
  }
  displayStar(count);
}
//function to display stars on the page
function displayStar(count) {

  for (star of stars) {
    if (count > 0) {
      star.style.display = 'none';
      count--;
    }
  }
}
//function to start timer for the Game
function startTimer() {
  clockId = setInterval(function() {
    ++time;
    displayTimer();
  }, 1000);
}
//function to display timer
function displayTimer() {
  const timer = document.querySelector('.timer');
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  if (secs < 10)
    timer.innerHTML = `${mins}:0${secs}`;
  else
    timer.innerHTML = `${mins}:${secs}`;
}
//function to stop timer
function stopTimer() {
  clearInterval(clockId);
}
//function to reset timer
function resetTimer() {
  stopTimer();
  timerStatus = false;
  time = 0;
  displayTimer();
}
//function to reset moves counter
function resetMovesCounter() {
  moves = 0;
  move.innerHTML = moves;
}
//function to reset star rating
function resetStarRating() {
  for (star of stars) {
    star.style.display = 'inline';
  }
}
//function to reset cards
function resetCards() {
  const currentListOfCards = document.querySelectorAll('.card');
  for (card of currentListOfCards) {
    card.className = 'card';
  }
}
//function to reset Game
function resetGame() {
  openCards = [];
  resetTimer();
  resetMovesCounter();
  resetStarRating();
  resetCards();
  starCounter = 0;
  resetModalStars();
  setUpBoard();
}
//function to write statistics on Congratulations modal
function setStatisticsOnModal() {
  const modalTimeStat = document.querySelector('.modal-time');
  const time = document.querySelector('.timer').innerHTML;

  const modalMovesStat = document.querySelector('.modal-moves');
  const moves = document.querySelector('.moves').innerHTML;

  const modalStarsStat = document.querySelectorAll('.modal-stars li');

  modalTimeStat.innerHTML = `Time: ${time}`;
  modalMovesStat.innerHTML = `Moves: ${moves}`;

  let i = 0;
  while (starCounter > 0) {
    modalStarsStat[i++].style.display = 'inline';
    starCounter--;
  }
}
//function to reset stars on congratulations Modal
function resetModalStars() {
  const modalStars = document.querySelectorAll('.modal-stars li');
  for (star of modalStars) {
    star.style.display = 'none';
  }
}
//function to display Congratulations Modal
function toggleCongratulationsModal() {
  const congratulationsModal = document.querySelector('.game-over-modal');
  congratulationsModal.classList.toggle('hide');
}
//function to start game Again
function startGameAgain() {
  resetGame();
  toggleCongratulationsModal();
}

/*
 *  Event Listeners
 */

//Event listener for card click event
cardsDeck.addEventListener('click', function(event) {
  const clickedCard = event.target;
  if (!timerStatus) {
    startTimer();
    timerStatus = true;
  }
  if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && !clickedCard.classList.contains('open') && openCards.length < 2) {
    movesCounter();
    toggleCards(clickedCard);
    openCards.push(clickedCard);
    if (openCards.length === 2) {
      matchCards();
      calculateStarRating();
    }
  }
});

//Event Listener for reset game
reset.addEventListener('click', resetGame);

//Event Listener for Restart game
playAgain.addEventListener('click', startGameAgain);

//Event Listener for closing Congratulations Modal
cancel.addEventListener('click', toggleCongratulationsModal);

/*
 * Initiate Game
 */

//setting up the board for the Game
setUpBoard();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
