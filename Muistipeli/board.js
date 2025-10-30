import { createCardElement } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍',
    '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;
let allPairsFoundCallback = null;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function createBoard(cardCount) {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) {
        console.error("Virhe: elementti #game-board ei löytynyt.");
        return;
    }
    
    gameBoard.innerHTML = '';
    [firstCard, secondCard, lockBoard, matchedPairs] = [null, null, false, 0];
    totalPairs = cardCount / 2;

    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => handleCardFlip(cardElement));
        gameBoard.appendChild(cardElement);
    });

    const gridSize = Math.ceil(Math.sqrt(cardCount));
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function handleCardFlip(cardElement) {
    if (lockBoard || cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', () => handleCardFlip(firstCard));
    secondCard.removeEventListener('click', () => handleCardFlip(secondCard));

    matchedPairs++;
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            if (allPairsFoundCallback) allPairsFoundCallback();
            alert("Kaikki parit löytyivät!");
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

export function onAllPairsFound(callback) {
    allPairsFoundCallback = callback;
}
