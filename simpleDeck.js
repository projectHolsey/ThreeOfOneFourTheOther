let deck = null;

function createDeck() {

    let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let suits = ["spades","clubs","diamond","heart"];

    let newDeck = {};

    for (const item in suits) {

        for (var i = 0; i < numbers.length; i++) {

            let nickname = i;
            switch(i) {
                case 11:
                    nickname = "jack";
                    break
                case 12:
                    nickname = "queen";
                    break;
                case 13:
                    nickname = "king";
                    break;
                default:
                    break;
            }

            let key = String(suits[item]) + "_" + String(i);
            newDeck[key] = {
                "suit" : suits[item],
                "value": i,
                "name": nickname
            }

        }

    }


    return newDeck;

}


deck = createDeck();
