/*
 * Create a list that holds all of your cards
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

let shuffledListOfCards = [];
let oldListOfCards = [];
const cardsDeck = document.querySelector('.deck');
let openCards = [];
let moves = 0;
let time = 0;
let timerStatus = false;
let clockId = 0;
const move = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars li');
const reset = document.querySelector('.restart');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// function to Place cards on board
function setUpBoard() {
  shuffledListOfCards = shuffle(listOfCards);
  console.log(shuffledListOfCards);
  oldListOfCards = document.querySelectorAll('.card i');
  console.log(oldListOfCards);
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
  console.log(openCards);
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    console.log('matched');
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    toggleCards(openCards[0]);
    toggleCards(openCards[1]);
    openCards = [];
  } else {
    console.log('unmatched');
    setTimeout(function() {
      toggleCards(openCards[0]);
      toggleCards(openCards[1]);
      openCards = [];
    }, 1000);

  }
}
// function to toggle cards
function toggleCards(clickedCard) {
  clickedCard.classList.toggle('open');
  clickedCard.classList.toggle('show');
}
//
function movesCounter() {
  moves++;
  move.innerHTML = moves;
}
//function to provide star rating
function calculateStarRating() {
  let count = 0;
  if (moves <= 8)
    count = 0;
  else if (moves > 8 && moves <= 16)
    count = 1;
  else {
    count = 2;
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
    time++;
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
function stopTimer(){
  clearInterval(clockId);
}
//function to reset timer
function resetTimer(){
  stopTimer();
  timerStatus = false;
  time = 0;
  displayTimer();
}
//function to reset moves counter
function resetMovesCounter(){
  moves = 0;
  move.innerHTML = moves;
}
//function to reset star rating
function resetStarRating(){
  for(star of stars){
    star.style.display = 'inline';
  }
}
//function to reset cards
function resetCards(){
  const currentListOfCards = document.querySelectorAll('.card');
  for(card of currentListOfCards){
    card.className = 'card';
  }
}
//function to reset Game
function resetGame(){
  resetTimer();
  resetMovesCounter();
  resetStarRating();
  resetCards();
  setUpBoard();
}
//
cardsDeck.addEventListener('click', function(event) {
  const clickedCard = event.target;
  if (!timerStatus) {
    startTimer();
    timerStatus = true;
  }
  if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && !clickedCard.classList.contains('open') && openCards.length < 2) {
    toggleCards(clickedCard);
    openCards.push(clickedCard);
    if (openCards.length === 2) {
      matchCards();
      movesCounter();
      calculateStarRating();
    }
  }
});
//
reset.addEventListener('click',resetGame);
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
