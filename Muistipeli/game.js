import { createBoard, onAllPairsFound } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');

    startNewGame();

    restartBtn.addEventListener('click', () => {
        startNewGame();
    });

    onAllPairsFound(() => {
        restartBtn.style.display = 'block';
    });
});

function startNewGame() {
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.style.display = 'none'; 

    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku, esim. 4, 8, 16):"), 10);

    if (isNaN(cardCount) || cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku!");
        return;
    }

    createBoard(cardCount);
}
