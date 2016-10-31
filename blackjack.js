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
  let move = readlineSync.keyInSelect(moveChoices, 'Your hand is: ' +
    playerHand[0].name + ', ' + playerHand[1].name + ' your score is: ' + score +
    ', would you like to hit or stay?');

  if (move === 0) {
    dealCard(playerHand);
  } else if (move === 1) {
   dealerStartGame(playerHand);
  }
}

function dealCard(playerHand) {

}

function dealerStartGame(playerHand) {

}

startGame();
