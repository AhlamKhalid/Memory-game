// create cards

// shape: diamond
const card_1 = document.createElement("li");
card_1.className = "card fa fa-diamond open show";
document.querySelector(".deck").appendChild(card_1);

const card_2 = document.createElement("li");
card_2.className = "card fa fa-diamond open show";
document.querySelector(".deck").appendChild(card_2);

// shape: paper-plane
const card_3 = document.createElement("li");
card_3.className = "card fa fa-paper-plane-o open show";
document.querySelector(".deck").appendChild(card_3);

const card_4 = document.createElement("li");
card_4.className = "card fa fa-paper-plane-o open show";
document.querySelector(".deck").appendChild(card_4);

// shape: anchor
const card_5 = document.createElement("li");
card_5.className = "card fa fa-anchor open show";
document.querySelector(".deck").appendChild(card_5);

const card_6 = document.createElement("li");
card_6.className = "card fa fa-anchor open show";
document.querySelector(".deck").appendChild(card_6);

// shape: bolt
const card_7 = document.createElement("li");
card_7.className = "card fa fa-bolt open show";
document.querySelector(".deck").appendChild(card_7);

const card_8 = document.createElement("li");
card_8.className = "card fa fa-bolt open show";
document.querySelector(".deck").appendChild(card_8);

// shape: cube
const card_9 = document.createElement("li");
card_9.className = "card fa fa-cube open show";
document.querySelector(".deck").appendChild(card_9);

const card_10 = document.createElement("li");
card_10.className = "card fa fa-cube open show";
document.querySelector(".deck").appendChild(card_10);

// shape: leaf
const card_11 = document.createElement("li");
card_11.className = "card fa fa-leaf open show";
document.querySelector(".deck").appendChild(card_11);

const card_12 = document.createElement("li");
card_12.className = "card fa fa-leaf open show";
document.querySelector(".deck").appendChild(card_12);

// shape: bicycle
const card_13 = document.createElement("li");
card_13.className = "card fa fa-bicycle open show";
document.querySelector(".deck").appendChild(card_13);

const card_14 = document.createElement("li");
card_14.className = "card fa fa-bicycle open show";
document.querySelector(".deck").appendChild(card_14);

// shape: bomb
const card_15 = document.createElement("li");
card_15.className = "card fa fa-bomb open show";
document.querySelector(".deck").appendChild(card_15);

const card_16 = document.createElement("li");
card_16.className = "card fa fa-bomb open show";
document.querySelector(".deck").appendChild(card_16);

/* **************************************************** */

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
