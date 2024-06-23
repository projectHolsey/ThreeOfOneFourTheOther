`
Win conditions
They need both of the following things.

4 || 3 of the same number
3 || 4 of the numbers incrementing, but with the same suit

E.G
1,1,1,1, 3 of hearts, 4 of hearts, 5 of hearts

ace of spaces, 2, 2, 2 of spades, 3 of spades, 4 of spades
`

let cards = [];

// Hold the current deck
let currentDeck = [];
// Hold the discarded cards to we can use them later as needed / if needed...
let discardedCards = [];

// User hands variables
let currentHand = [];
const handLimit = 7;

// aliases for the current deck for front facing side
const deckAlias = {
    "1": "Ace",
    "11": "Jack",
    "12": "Queen",
    "13": "King"
}

function getRandomCard(max) { 
    return Math.floor(Math.random() * max);
}


function makeDeck() {
    let suits = ["Diamonds", "Clubs", "Spades", "Hearts"];
    let deckNumbers = [
        "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10",
        "11", "12", "13"
    ]

    let deck = [];

    for (let i = 0 ; i < deckNumbers.length; i++) {
        for (let y = 0; y < suits.length; y++) {
            deck.push(deckNumbers[i] + ":" + suits[y]);
        }
    }

    return deck;
}


function createHand() {

    for (let i = 0; i < handLimit; i++) {
        let newCardNum = getRandomCard(currentDeck.length);
        console.log(newCardNum);
        
        // Get the current card
        let newCardValue = currentDeck[newCardNum];
        
        // remove it from the deck
        currentDeck.pop(newCardNum);

        // Push it to the current hand
        currentHand.push(newCardValue);
    }

}

function drawCard() {

    let newCardNum = getRandomCard(currentDeck.length);

    // Get the current card
    let newCardValue = currentDeck[newCardNum];

    // remove it from the deck
    currentDeck.pop(newCardNum);

}

function displayCurrentHand(withNumber = false) {

    for (let i = 0; i < currentHand.length; i++) {
        if (withNumber) {
            console.log(i + ": " + currentHand[i])
        } else {

            console.log(currentHand[i]);
        }
    }
}

function chooseCardToDiscard() {

    let cardNum = prompt();
}



function main() {

    cards = makeDeck();
    console.log(cards);
    currentDeck = cards;

    createHand();
    console.log(currentHand);

}

main();

