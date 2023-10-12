
const startButton = document.getElementById("start")
const standButton = document.getElementById("stand")
const hitButton = document.getElementById("hit")
const retryButton = document.getElementById("retry")
const gameDiv = document.getElementById("gameDiv")
const startDiv = document.getElementById("startDiv")
const endGame = document.getElementById("endGame");

const enemyHiddenCard = document.getElementById("enemyHiddenCard");
const enemyCard1 = document.getElementById("enemyCard1");
const enemyCard2 = document.getElementById("enemyCard2");
const enemyCard3 = document.getElementById("enemyCard3");
const enemyCard4 = document.getElementById("enemyCard4");
const enemyCard5 = document.getElementById("enemyCard5");
var enemyCards = [enemyCard1, enemyCard2, enemyCard3, enemyCard4, enemyCard5]
var enemyTotal = document.getElementById("enemyTotal");

const playerCard1 = document.getElementById("playerCard1");
const playerCard2 = document.getElementById("playerCard2");
const playerCard3 = document.getElementById("playerCard3");
const playerCard4 = document.getElementById("playerCard4");
const playerCard5 = document.getElementById("playerCard5");
var playerCards = [playerCard1, playerCard2, playerCard3, playerCard4, playerCard5]
var playerTotal = document.getElementById("playerTotal");


retryButton.addEventListener("click", start)
startButton.addEventListener("click", start);
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);

var cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
var playerNumOfCards = 0;
var enemyNumOfCards = 0;
var playerTotalValue = 0;
var enemeyTotalValue = 0;

function getSuit() {
    var num = parseInt(Math.random() * 4) + 1;
    if (num < 2) {
        return "clubs";
    } else if (num < 3) {
        return "hearts"
    } else if (num < 4) {
        return "diamonds"
    } else {
        return "spades"
    }
}

function getRandomValue() {
    var num = parseInt(Math.random() * 14) + 1;
    if (num == 1 || num == 14) {
        return "ace";
    } else if (num == 11) {
        return "jack";
    } else if (num == 12) {
        return "queen"
    } else if (num == 13) {
        return "king";
    } else {
        return "" + num;
    }
}

function getCard() {
    return getRandomValue() + "_of_" + getSuit() + ".png"
}


function start() {
    numOfCards = 2;
    startDiv.hidden = true;
    gameDiv.hidden = false;
    for (let x = 0; x < 5; x++) {
        enemyCards[x].src = "";
        playerCards[x].src = ""
    }
    playerTotalValue = 0;
    enemeyTotalValue = 0;
    hitButton.hidden = false;
    standButton.hidden = false;
    enemyCard2.hidden = true;
    enemyHiddenCard.hidden = false;
    endGame.innerHTML = ""
    retryButton.hidden = true
    for (let x = 0; x < 2; x++) {
        enemyCards[x].src = "images/cards/" + getCard();
        var cardValue = parseInt(cardValues.indexOf(enemyCards[x].getAttribute('src').substring(enemyCards[x].getAttribute('src').indexOf("images/cards/") + 13, enemyCards[x].getAttribute('src').indexOf("_"))) + 1);
        if (cardValue >= 10) {
            enemeyTotalValue += 10
        } else if (cardValue <= 0) {
            enemeyTotalValue += 1
        } else {
            enemeyTotalValue += cardValue;
        }
    }
    enemyTotal.innerHTML = enemeyTotalValue
    for (let x = 0; x < 2; x++) {
        playerCards[x].src = "images/cards/" + getCard();
        var cardValue = parseInt(cardValues.indexOf(playerCards[x].getAttribute('src').substring(playerCards[x].getAttribute('src').indexOf("images/cards/") + 13, playerCards[x].getAttribute('src').indexOf("_"))) + 1);
        if (cardValue >= 10) {
            playerTotalValue += 10
        } else if (cardValue <= 0) {
            playerTotalValue += 1
        } else {
            playerTotalValue += cardValue;
        }

    }
    enemyCards[1].hidden = true
    playerTotal.innerHTML = playerTotalValue
}

function hit() {
    numOfCards++;
    playerCards[numOfCards - 1].src = "images/cards/" + getCard()
    var cardValue = parseInt(cardValues.indexOf(playerCards[numOfCards - 1].getAttribute('src').substring(playerCards[numOfCards - 1].getAttribute('src').indexOf("images/cards/") + 13, playerCards[numOfCards - 1].getAttribute('src').indexOf("_"))) + 1);
    if (cardValue >= 10) {
        playerTotalValue += 10
    } else if (cardValue <= 0) {
        playerTotalValue += 1
    } else {
        playerTotalValue += cardValue;
    }
    playerTotal.innerHTML = playerTotalValue
    if (playerTotalValue > 21 || playerNumOfCards > 4) {
        stand()
    }
}

function stand() {
    hitButton.hidden = true;
    standButton.hidden = true;
    enemyCard2.hidden = false;
    enemyHiddenCard.hidden = true;
    retryButton.hidden = false
    if (enemeyTotalValue > playerTotalValue || playerTotalValue > 21) {
        endGame.innerHTML = "YOU LOSE!"
    } else {
        endGame.innerHTML = "YOU WIN!"
    }
}