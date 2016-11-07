let readlineSync = require('readline-sync');
let _ = require('lodash');
let playerHand = [];
let dealerHand = [];
let moveChoices = ['hit', 'stay'];
let makeDeck = require('./makeDeck')
let deck = makeDeck.deck();

function startGame() {
  deck = _.shuffle(deck);
  playerHand.push(deck.pop());
  playerHand.push(deck.pop());
  let playerScore = playerHand[0].value + playerHand[1].value;
  if (playerScore === 21) {
    console.log(
      'Your hand is: ' +
      playerHand[0].name + ', ' + playerHand[1].name + ' your score is: ' + playerScore +
      'You win!'
    );
    return;
  }
  let move = readlineSync.keyInSelect(
    moveChoices,
    'Your hand is: ' + playerHand[0].name + ', ' + playerHand[1].name +
    ' your score is: ' + playerScore + ', would you like to hit or stay?');

  if (move === 0) {
    dealCard(playerHand, playerScore);
  } else if (move === 1) {
   dealerStartGame(playerHand, playerScore);
  }
}

function dealCard(playerHand, playerScore) {
  let cardInPlay = deck.pop();
  let cardString = ' Your hand is: ';
  playerHand.push(cardInPlay);
  playerScore += cardInPlay.value;

  for (var i = 0; i < playerHand.length; i++) {
    cardString += (playerHand[i].name + ' ');
  }
// Loop through deck of cards
  if (playerScore === 21) {
    console.log(
      'You drew ' + cardInPlay.name + cardString +
      '. Total 21 points. Time for the dealer to draw');
    return dealerStartGame(playerScore)
  }
  if (playerScore > 21) {
    console.log(
      'You drew: ' + cardInPlay.name  + cardString + '. Your score is: ' +
      playerScore + ' you lose :-('
    );
  } else {
    let move = readlineSync.keyInSelect(
      moveChoices,
      cardString + ' your score is: ' + playerScore +
      ', would you like to hit or stay?'
    );
    if (move === 0) {
      dealCard(playerHand, playerScore);
    } else if (move === 1) {
     dealerStartGame(playerScore);
    }
  }
}

function dealerStartGame(playerScore) {
  dealerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  let dealerScore = dealerHand[0].value + dealerHand[1].value;
  checkScore(playerScore, dealerScore, dealerHand);
}

function drawCard(playerScore, dealerScore,dealerHand) {
  dealerHand.push(deck.pop());
  dealerScore += dealerHand[dealerHand.length - 1].value;
  checkScore(playerScore, dealerScore, dealerHand);
}

function checkScore(playerScore, dealerScore, dealerHand) {
  if (dealerScore > 17) {
    console.log(
      'Dealer has dealt ' + dealerHand[0].name + ' and ' + dealerHand[1].name +
      ' for a total score of ' + dealerScore + ' dealer stays'
    );
    readlineSync.keyInPause();
    if (dealerScore > playerScore) {
      console.log(
        'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
        ' you lose'
       );
    } else if (dealerScore === playerScore) {
      'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
      ' it is a push'
    } else {
      'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
      ' you win'
    }
  } else {
    // loop through the deck as it gets longer
    console.log(
      'Dealer has dealt ' + dealerHand[0].name + ' and ' + dealerHand[1].name +
      ' for a total score of ' + dealerScore + ' dealer draws again'
    );
    readlineSync.keyInPause();
    drawCard(playerScore, dealerScore, dealerHand);
  }
}

startGame();
