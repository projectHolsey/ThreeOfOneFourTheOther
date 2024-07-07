`
Win conditions
They need both of the following things.

4 || 3 of the same number
3 || 4 of the numbers incrementing, but with the same suit

E.G
1,1,1,1, 3 of hearts, 4 of hearts, 5 of hearts

ace of spaces, 2, 2, 2 of spades, 3 of spades, 4 of spades
`

const prompt = require("prompt-sync")({ sigint: true });

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

    currentHand.push(newCardValue);

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
    
    displayCurrentHand(true);

    const cardNum = prompt("Please select a card to discard: ");

    if (cardNum[0] >= '0' && cardNum[0] <= '8') {
        // Add it to the discarded pile
        discardedCards.push(currentHand[cardNum[0]]);

        currentHand.splice(cardNum[0], 1); // 2nd parameter means remove one item only

        // remove it from the user's hand
        currentHand.pop[cardNum[0]];

        displayCurrentHand();
    } else {
        console.log("Invalid selection, please try again.");
        chooseCardToDiscard();
    }

}

function customBinarySort() {
    // Sorting the current hand based on the value prior to the colon
    for (let i = 0; i < currentHand.length - 1; i++) {

        for (let y = i + 1; y < currentHand.length; y++) {
            let current_val = currentHand[i].split(":")[0]; // get the value of current card

            let next_value = currentHand[y].split(":")[0];

            // swap the 2 elements if the condtitions is met.
            if (Number(current_val) > Number(next_value)) {
                let temp = currentHand[i];
                currentHand[i] = currentHand[y];
                currentHand[y] = temp;
            }
        }
    }
}


function checkDeckContainsSuits() {
    `
    In order for this to return true:
    The collection of cards must contain 3 incrementing cards with the same suit
    E.G - 1,2,3 of spade
    OR
    1,2,3,4 of hearts

    To do this - Need to find firstly if the deck has 3 cards that go up 
    ( 1,2,3 for example )
    Then we can check the suit of these

    First off - split the card into value and suit
    Check if there's an incrementing set of values
    Check their suits match

    // Note - watch out as there may be several incrementing values, so we'll need to check all the different combinations can work..
    `

    customBinarySort();

    
    // Storing what the current count is suits is.. 
    let suitCounter = {
        "Hearts": 0,
        "Clubs": 0,
        "Spades": 0,
        "Diamonds": 0,
    }

    let hasSuits = false;
    let isFour = false;

    for (let i = 0; i < currentHand.length - 1; i++) {
        let splitItem = currentHand[i].split(":");
        if (Number(splitItem[0]) == Number(currentHand[i + 1].split(":")[0])) {
            suitCounter[splitItem[1]] += 1; // increment the suit counter for this as it might be the start of new counter..
            continue;
        }
        if (Number(splitItem[0]) + 1 == Number(currentHand[i + 1].split(":")[0])) {
            
            // Checking if the suits are the same..
            if (splitItem[1] == currentHand[i + 1].split(":")[1]) {
                
                suitCounter[splitItem[1]] += 1; // Increment the current suit counter

                if (suitCounter[splitItem[1]] == 2) {
                    hasSuits = true;
                    // End condition - only time this can be met is here..
                    console.log(suitCounter);
                }
                if (suitCounter[splitItem[1]] == 3) {
                    isFour = true; 
                    // Just recording that this was a match of 4 
                    console.log(suitCounter);
                }

            } else { 
                // If the suits don't match, reset all the other suit counters
                for (var key in suitCounter) {
                    if (key != splitItem[1]) {
                        suitCounter[key] = 0; // reset suit counters for all but the current one
                    }
                }
            }
        } else { 
            // If we're here, the next number incremented too much, so we basically reset.
            for (var key in suitCounter) {
                suitCounter[key] = 0; // reset suit counters for all but the current one
            }
        }
    }

    if (hasSuits) {
        return true;
    }
    return false;
    
}

function test_Sort() {
    currentHand = ["13:das","13:das","13:das","3:das","2:das","1:das","11:das","10:das"];
    console.log(currentHand);
    customBinarySort();
    console.log(currentHand);
}

function main() {

    cards = makeDeck();
    console.log(cards);
    currentDeck = cards;

    createHand();

    while(true) {

        drawCard();

        chooseCardToDiscard();

        checkDeckContainsSuits();
    }

}

main();
// test_Sort();



// these are win conditions for the incrementing suits..
// All of these should pass. Need to make into tests....... :/ 
const testConditionsSuits = [
    [
        "1:spades",
        "2:spades",
        "3:spades",
        "4:spades",
        "5:spades",
        "5:clubs",
        "5:diamonds",
    ],
    [
        "1:spades",
        "2:hearts",
        "2:spades",
        "2:diamonds",
        "2:clubs",
        "3:spades",
        "5:diamonds",
    ],
    [
        "1:spades",
        "2:diamonds",
        "2:spades",
        "3:diamonds",
        "3:hearts",
        "3:spades",
        "3:clubs",
    ]
]