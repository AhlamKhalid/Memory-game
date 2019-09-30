<!-- Title -->
# Memory Game 
A game where you match each card with another one that has the same symbol. In case of matching all cards, you win ~~
<!-- Table of contents -->
## Contents

* [Features](#Features)
* [Demo](#Demo)
* [Dependencies](#Dependencies)
* [Problems & solutions](#Problems-&-solutions)

<!-- Game features -->
## Features

- Number of moves 

- Star rating 

- Timer with minutes & seconds

- Reset button 

- Animation for matched & unmatched cards

- Winning modal 

<!-- Live demo -->
## Demo
### Playing:
![demo of playing](/gif/play.gif)
### Winning:
![demo of winning](/gif/winning.gif)

<!-- Dependencies -->
## Dependencies
Font awesome icons.

<!-- Problems & solutions -->
## Problems & solutions
- Deck and the cards

    While resetting, new cards were added to the deck in addition to the old ones. So, before adding new cards, make sure to clear old ones. 
    ```javascript
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    } 
    ```  

- Stars in winning modal

    To display the stars in winning modal, I got the actual stars and placed them in the modal but they disappeared from the original place. So, use clones of the stars! The function `cloneNode()` is helpful for that.

- Display the modal 

    To center the modal, I had to use `display: flex` and the properties `justify-content` and `align-items` but the modal would be visible all the time! So, I added a container around the modal and controled the dispaly of this container.  

- Initialize seconds after each minute

    As the first minute is passing, I noticed that there is unsmooth change in initializing the seconds. So, first, clear the seconds timer then reset the seconds and start the timer again.  

- Edit moves then check matching 

    When displaying the moves in winning modal, I noticed that the moves is less by one than in the game! So, function calls should be reordered, i.e. call `editMoves()` first before `checkMatching()` function.

- Second card is not shown in case of unmatching

    The cause was that I needed to cover the card again but it happened right away! So, I used `setTimeout` to keep the card shown for a period of time before it is covered again. 

- Minutes & seconds in winning modal

    To display the time in winning modal, I used the variables `seconds` and `minutes` but that didn't work as they provided wrong numbers. So, I had another way to get this info using `minElement.firstChild.nodeValue` and `secElement.firstChild.nodeValue`.






