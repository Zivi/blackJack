exports.deck = function() {
  let deck = [];
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  let faceCards = {
    1: 'Ace',
    11: 'Jack',
    12: 'Queen',
    13: 'King'
  };
  let faceValue = 1;
  let faceName;
  for (let i = 1; i <= 13 ; i += 1) {
    faceName = faceCards[i] || i;
    faceValue = (i > 10) ? 10 : i;
    for (let j = 0; j < 4; j += 1) {
      deck.push({
        value: faceValue,
        suit: suits[j],
        name: `${faceName} of ${suits[j]}`
      })
    };
  };
  return deck;
};
