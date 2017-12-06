/*
 * Create a list that holds all of your cards
 * Timer vairable to control timer, cardArray for matched
 * items and moves to track user moves
 */
 let cardArray = [];
 let moves = 0;
 let timer = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffleCards();

//Shuffle Cards to begin a new game
function shuffleCards() {
  const cards = $('.card');

  const shuffledCards = shuffle(cards);

  $('.deck').html(shuffledCards);

  for (const card of shuffledCards) {
    $(card).addClass('match');
  }

  openCardsOnStart(cards);
}

//Displays cards for a second before game play
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
 //Event listener to trigger once a card is clicked
 $(document).on('click', '.card', function() {
   if (!$(this).hasClass('clicked')) {
     $(this).addClass('clicked');
     displayCard($(this));
     addCardToList($(this));
     if (!$('.counter').hasClass('start')) {
       timer = startCounter();
     }
   }
 });

//Controls the counter for the game
 function startCounter() {
   $('.counter').addClass('start');
   let seconds = 0, minutes = 0, hours = 0, days = 0;
   let time = '';
   return window.setInterval(function () {
     seconds++;
     if (seconds === 60) {
       seconds = 0;
       minutes++;
     }

     if (minutes === 60) {
       minutes = 0;
       hours++
     }

     if (hours === 24) {
       hours = 0;
       days++
     }
     time = `${days}:${hours}:${minutes}:${seconds}`;
     $('.counter').html(time);
   }, 1000);
 }

//Displays a card once it is clicked
 function displayCard(card) {
   card.addClass('open show');
 }

/* Adds a card to the cardArray so that the cards can be checked
 * to see if they match
 */

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
     $('.clicked').removeClass('clicked');
   }

   setTimeout(function() {
     checkWinner();
   }, 500);
 }

//Once the cards are the same this function adds the class match
 function matchCards() {
   for (const card of cardArray) {
     card.addClass('match animate');
   }
 }

//Hides the cards that were clicked but are not the same cards
 function unmatchCards() {
   for (const card of cardArray) {
     card.removeClass('open show');
    card.removeClass('incorrect');
   }
   cardArray.pop();
   cardArray.pop();
 }

//increases the moves once two difference cards are clicked
 function increaseMoves() {
   moves++;
   $('.moves').html(moves);
   checkStarRating();
 }

//Decreases star rating based on the number of moves made
function checkStarRating() {
  const starsChildren = $('.stars').children();
  if (moves >= 12 && moves < 16) {
    $(starsChildren[0]).hide();
  }
  if (moves >= 16 && moves < 20) {
    $(starsChildren[1]).hide();
  }
}

//Checks to see if the game has been won
 function checkWinner(){
   const matches = $('.match');
   const cards = $('.card');
   if (matches.length  === cards.length) {
     window.clearInterval(timer);
     const rating = getStarRating();
     const timeTaken = getTimeTaken();
     swal(
       'You Won!',
       `Rating: ${rating} <br> Time: ${timeTaken} <br> Play Again?`,
       'success')
    .then((gameRestart) => {
        if (gameRestart) {
          restartGame();
        }
      });
   }
 }

//Retrieves the star rating at the end of the game
 function getStarRating() {
   const stars = $('.fa-star:visible');
   return stars.length;
 }

 //Retrieves the time taken to complete the game
 function getTimeTaken() {
   return $('.counter').text();
 }

//Restarts the game on click
$('.restart').on('click', function() {
  restartGame();
})

//function to restart the game
function restartGame() {
  moves = -1;
  increaseMoves();
  shuffleCards();
  resetStars();
  clearCounter();
  cardArray = [];
}

function resetStars() {
  const starsChildren = $('.stars').children();

  for (const star of starsChildren) {
    $(this).show();
  }
}

function clearCounter() {
  $('.counter').removeClass('start').html('0:0:0:0');
  window.clearInterval(timer);
}
