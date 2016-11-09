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

  for (let i = 0; i < playerHand.length; i++) {
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
  let dealerCardString = ' Dealer\'s hand is: ';
  for (let i = 0; i < dealerHand.length; i++) {
    dealerCardString += (dealerHand[i].name + ' ');
  }
dealerScore = 20;
  if (dealerScore >= 17 && dealerScore < 22) {
    console.log(
      'Dealer has dealt ' + dealerHand[0].name + ' and ' + dealerCardString +
      ' for a total score of ' + dealerScore + ' dealer stays'
    );
    if (dealerScore > playerScore) {
      console.log(
        'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
        dealerCardString + ' you lose'
       );
    } else if (dealerScore === playerScore) {
      console.log(
        'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
        dealerCardString +' it is a push'
      );
    } else if (dealerScore < playerScore) {
      console.log(
        'Your score is ' + playerScore + ' dealer score is ' + dealerScore +
        dealerCardString + ' you win'
      );
    }
  } else if (dealerScore >= 22) {
    console.log(dealerCardString + 'dealer busts, you win')
  } else {
    console.log(
      'Dealer has dealt ' + dealerHand[0].name + dealerCardString +
      ' for a total score of ' + dealerScore + ' dealer draws again'
    );
    readlineSync.keyInPause();
    drawCard(playerScore, dealerScore, dealerHand);
  }
}

startGame();
