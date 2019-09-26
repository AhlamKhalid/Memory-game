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

// arrow function to display cards on the deck
const displayCards = () => {
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
  seconds = 0;
  // after 1min, reinvoke the function
  minTimer = setTimeout(adjustMinutes, 60000);
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
    // if there are two cards, check if they match
    checkMatching();
    // invoke editMoves function
    // whenever the second card
    // is clicked
    editMoves();
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

// Edit number of moves
const editMoves = () => {
  // increment number of moves by one
  moves = moves + 1;
  // Get the element to hold the number
  const movesElement = document.querySelector(".moves");
  // update the value
  movesElement.innerHTML = moves;
  // invoke editStars function
  editStars();
};

// -----------------------------------------------------------

// Edit star rating
const editStars = () => {
  // Get the second & third stars
  const secondStar = document.querySelector(".second-star");
  const thirdStar = document.querySelector(".third-star");
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

// shuffle shapes to get different order each time
const shuffledArray = shuffle(shapeArray);

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
let moves = 0;

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
