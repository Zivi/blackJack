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
  let score = playerHand[0].value + playerHand[1].value;
  if (score === 21) {
    console.log(
      'Your hand is: ' +
      playerHand[0].name + ', ' + playerHand[1].name + ' your score is: ' + score +
      'You win!'
    );
    return;
  }
  let move = readlineSync.keyInSelect(
    moveChoices,
    'Your hand is: ' + playerHand[0].name + ', ' + playerHand[1].name +
    ' your score is: ' + score + ', would you like to hit or stay?');

  if (move === 0) {
    dealCard(playerHand, score);
  } else if (move === 1) {
   dealerStartGame(playerHand, score);
  }
}

function dealCard(playerHand, score) {
  let cardInPlay = deck.pop();
  let cardString = ' Your hand is: ';
  playerHand.push(cardInPlay);
  score += cardInPlay.value;

  for (var i = 0; i < playerHand.length; i++) {
    cardString += (playerHand[i].name + ' ');
  }

  if (score === 21) {
    console.log(
      'You drew ' + cardInPlay.name + cardString +
      '. Total 21 points. Time for the dealer to draw');
    return dealerStartGame(score)
  }
  if (score > 21) {
    console.log(
      'You drew: ' + cardInPlay.name  + cardString + '. Your score is: ' +
      score + ' you lose :-('
    );
  } else {
    let move = readlineSync.keyInSelect(
      moveChoices,
      cardString + ' your score is: ' + score +
      ', would you like to hit or stay?'
    );
    if (move === 0) {
      dealCard(playerHand, score);
    } else if (move === 1) {
     dealerStartGame(score);
    }
  }
}

function dealerStartGame(score) {

}

startGame();
