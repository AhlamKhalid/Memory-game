// functions

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// -----------------------------------------------------------

// display cards on the deck
const displayCards = () => {
  // shuffle shapes to get different order each time
  let shuffledArray = shuffle(shapeArray);
  // fragment for cards
  const fragment = document.createDocumentFragment();
  // loop to create a card for each shape
  for (shape of shuffledArray) {
    // create new li element(the card)
    const card = document.createElement("li");
    // give it class name
    // card: style the card
    // fa and ${shape}: define the shape
    card.className = `card fa ${shape}`;
    // append card to fragment
    fragment.appendChild(card);
  }
  // make sure the deck is empty
  // to avoid appending new cards
  // to old ones when restart the game.
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
  // append fragment to deck
  deck.appendChild(fragment);
};

// -----------------------------------------------------------

// adjust timer
const adjustTimer = () => {
  // invoke adjustSeconds function
  adjustSeconds();
  // invoke adjustMinutes function
  adjustMinutes();
};

// -----------------------------------------------------------

// adjust seconds
const adjustSeconds = () => {
  // update seconds element
  secElement.innerHTML = seconds;
  // update seconds value
  seconds = seconds + 1;
  // after 1sec, reinvoke the function
  secTimer = setTimeout(adjustSeconds, 1000);
};

// -----------------------------------------------------------

// adjust minutes
const adjustMinutes = () => {
  // update minutes element
  minElement.innerHTML = minutes;
  // update minutes value
  minutes = minutes + 1;
  // After each minute, seconds is reset
  // So, invoke resetSeconds function
  resetSeconds();
  // after 1min, reinvoke the function
  minTimer = setTimeout(adjustMinutes, 60000);
};

// -----------------------------------------------------------

// reset seconds
const resetSeconds = () => {
  // cancel the previous seconds timer
  // So, no conflicts will arise.
  clearTimeout(secTimer);
  // initialize seconds
  seconds = 0;
  // reinvoke adjustSeconds functions
  adjustSeconds();
};

// -----------------------------------------------------------

// Event listener of the deck
// parameter (the event itself)
const clickCard = event => {
  // Get event target (what was actually been clicked)
  const card = event.target;
  // Check if a card is clicked (and not the deck!)
  // & the card is not already opened
  // & the card is not already matched
  if (
    card.nodeName.toLowerCase() === "li" &&
    !card.classList.contains("open") &&
    !card.classList.contains("match")
  ) {
    // invoke openCard function
    openCard(card);
    // invoke addCardToOpenedCards function
    addCardToOpenedCards(card);
  }
};

// -----------------------------------------------------------

// open & show the symbol on card when clicked
const openCard = card => {
  card.classList.add("open");
  card.classList.add("show");
};

// -----------------------------------------------------------

// add the clicked card to a list of open cards
// & check if there are two cards already in the
// list
const addCardToOpenedCards = card => {
  // Add the card
  openedCards.push(card);
  // check how many cards in the list
  if (openedCards.length === 2) {
    // invoke editMoves function
    // whenever a second card
    // is clicked.
    editMoves();
    // check if the cards match
    checkMatching();
  }
};

// -----------------------------------------------------------

// check if two cards are matched
const checkMatching = () => {
  // Get the cards by destructing
  const [firstCard, secondCard] = openedCards;
  // compare two cards by class name.
  // match
  if (firstCard.className === secondCard.className) {
    // invoke match function
    match();
  }
  // not match
  else {
    // invoke notMatch function
    notMatch();
  }
};

// -----------------------------------------------------------

// the cards are matched
const match = () => {
  openedCards.forEach(card => {
    // remove open & show classes because
    // match class does the same job :)
    card.classList.remove("open", "show");
    card.classList.add("match");
  });
  // empty openedCards list
  openedCards = [];
  // invoke winCheck function
  winCheck();
};

// -----------------------------------------------------------

// the cards are not matched
const notMatch = () => {
  // setTimeout is used to give the chance
  // for the second card to be shown
  // before it is covered again (after 1s delay)
  setTimeout(() => {
    openedCards.forEach(card => {
      card.classList.remove("open", "show");
    });
    // empty openedCards list
    openedCards = [];
  }, 1000);
};

// -----------------------------------------------------------

// check if a user wins
const winCheck = () => {
  // increment counter
  winCounter = winCounter + 1;
  // number of unique shapes is eight
  // So, if all eight cards have been
  // matched, the user wins
  // & he/she is awesome :))
  if (winCounter === 8) {
    // moves
    console.log(`moves: ${moves}`);
    // stars
    console.log(firstStar, secondStar, thirdStar);
    // stop timers
    clearTimeout(secTimer);
    clearTimeout(minTimer);
    // get value of minutes & seconds
    console.log(
      minElement.firstChild.nodeValue,
      secElement.firstChild.nodeValue
    );
  }
};

// -----------------------------------------------------------

// Edit number of moves
const editMoves = () => {
  // increment number of moves by one
  moves = moves + 1;
  // update the value
  movesElement.innerHTML = moves;
  // invoke editStars function
  editStars();
};

// -----------------------------------------------------------

// Edit star rating
const editStars = () => {
  // After sixteen tries, one star is gone :)
  if (moves === 17) {
    // change star shape
    thirdStar.classList.remove("fa-star");
    thirdStar.classList.add("fa-star-o");
  }
  // After eight additional chances,
  // the second star is sadly gone :)
  if (moves === 26) {
    // change star shape
    secondStar.classList.remove("fa-star");
    secondStar.classList.add("fa-star-o");
  }
};

// -----------------------------------------------------------

// Event listener of restart button
const restart = () => {
  // empty openedCards list(start afresh)
  openedCards = [];
  // reinvoke displayCards function
  displayCards();
  // invoke resetStars function
  resetStars();
  // invoke initializeMoves function
  initializeMoves();
  // invoke resetTimer function
  resetTimer();
};

// -----------------------------------------------------------

// reset stars
const resetStars = () => {
  // check which shape it is of
  // the third & second stars.
  if (thirdStar.classList.contains("fa-star-o")) {
    // remove the unfilled star &
    // replace it with the filled one.
    thirdStar.classList.remove("fa-star-o");
    thirdStar.classList.add("fa-star");
  }
  if (secondStar.classList.contains("fa-star-o")) {
    secondStar.classList.remove("fa-star-o");
    secondStar.classList.add("fa-star");
  }
};

// -----------------------------------------------------------

// initialize moves
const initializeMoves = () => {
  // intialize moves
  moves = 0;
  // update value in movesElement
  movesElement.innerHTML = moves;
};

// -----------------------------------------------------------

// reset timer
const resetTimer = () => {
  // cancel previous timers
  // of seconds & minutes.
  clearTimeout(secTimer);
  clearTimeout(minTimer);
  // reinitialize seconds & minutes
  seconds = 0;
  minutes = 0;
  // reinvoke adjustTimer function
  adjustTimer();
};

// -----------------------------------------------------------

// Main code

// Get deck
const deck = document.querySelector(".deck");

// array to hold shapes
const shapeArray = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

// invoke displayCards function
displayCards();

// variables for the timer //
// Get minutes & seconds elements
const minElement = document.querySelector(".minutes");
const secElement = document.querySelector(".seconds");
// initialize minutes & seconds
let minutes = 0;
let seconds = 0;
// variables to be used to cancel the timer
let secTimer;
let minTimer;

// invoke adjustTimer function
adjustTimer();

// add event listener to the deck
deck.addEventListener("click", clickCard);

// Array of opened cards to check matching
let openedCards = [];

// number of moves
let moves;
// Get the element to hold the number of moves
const movesElement = document.querySelector(".moves");
// invoke initializeMoves function
initializeMoves();

// Get stars elements
const firstStar = document.querySelector(".first-star");
const secondStar = document.querySelector(".second-star");
const thirdStar = document.querySelector(".third-star");

// get restart button
const restartButton = document.querySelector(".restart");
// Add event listener to the button
restartButton.addEventListener("click", restart);

// variable acts as a flag to know
// if a user wins.
let winCounter = 0;

const openHandler = () => {
  modal.classList.remove("modal-closed");
  modal.classList.add("modal-opened");
};
const closeHandler = () => {
  modal.classList.remove("modal-opened");
  modal.classList.add("modal-closed");
};

// modal variables
const openButton = document.querySelector(".open");
const closeButton = document.querySelector(".close");
const modal = document.querySelector("#modal-container");
// Event listeners
openButton.addEventListener("click", openHandler);
closeButton.addEventListener("click", closeHandler);

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
