let readlineSync = require('readline-sync');
let playerHand = [];
let dealerHand = [];

let makeDeck = require('./makeDeck')
let deck = makeDeck.deck();

function deal(deck) {
  let cardInPlay = deck.splice(Math.floor(Math.random() * (deck.length)), 1);
  return cardInPlay[0];
}

function startGame(deck) {
 playerHand.push(deal(deck));
 playerHand.push(deal(deck));
 
}

startGame(deck);
