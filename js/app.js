/*
 * Create a list that holds all of your cards
 */
 let cardArray = [];
 let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffleCards();

function shuffleCards() {
  const cards = $('.card');

  const shuffledCards = shuffle(cards);

  $('.deck').html(shuffledCards);

  for (const card of shuffledCards) {
    $(card).addClass('match');
  }

  openCardsOnStart(cards);
}

function openCardsOnStart(cards) {
  setTimeout(function() {
    for (const card of cards) {
      $(card).removeClass('match open show');
    }
  }, 1000);

}

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
 $(document).on('click', '.card', function() {
   displayCard($(this));
   addCardToList($(this));
 });

 function displayCard(card) {
   card.addClass('open show');
 }

 function addCardToList(card) {
   cardArray.push(card);


   if (cardArray.length > 1) {
     if(cardArray[0].children('.fa').first().attr('class') === cardArray[1].children('.fa').first().attr('class')) {
       matchCards();
     } else {
         cardArray[0].addClass('incorrect');
         cardArray[1].addClass('incorrect');
     }
     setTimeout(function() {
       unmatchCards()
     }, 500);
     increaseMoves();
   }

   setTimeout(function() {
     checkWinner();
   }, 500);
 }

 function matchCards() {
   for (const card of cardArray) {
     card.addClass('match animate');
   }
 }

 function unmatchCards() {
   for (const card of cardArray) {
     card.removeClass('open show');
    card.removeClass('incorrect');
   }
   cardArray.pop();
   cardArray.pop();
 }

 function increaseMoves() {
   moves++;
   $('.moves').html(moves);
 }

 function checkWinner(){
   const matches = $('.match');
   const cards = $('.card');
   if (matches.length  === cards.length) {
     alert("Winner");
   }
 }

$('.restart').on('click', function() {
  moves = -1;
  increaseMoves();
  shuffleCards();
  cardArray = [];
})
