let players = [];
let scores = [];
let currentPlayer = 0;
let turnScore = 0;
let target = 100;
let diceCount = 1;
let tripleDoubles = 0;

const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const playerNamesDiv = document.getElementById('playerNames');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const turnInfo = document.getElementById('turnInfo');
const turnScoreSpan = document.getElementById('turnScore');
const diceArea = document.getElementById('diceArea');
const scoreBoard = document.getElementById('scoreBoard');

document.getElementById('playerCount').addEventListener('change', makeNameFields);
document.getElementById('startBtn').addEventListener('click', startGame);
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);

makeNameFields();

function makeNameFields() {
  const count = document.getElementById('playerCount').value;
  playerNamesDiv.innerHTML = '';
  for (let i = 0; i < count; i++) {
    playerNamesDiv.innerHTML += `<div><label>Pelaaja ${i + 1}: <input id="p${i}" placeholder="Nimi"></label></div>`;
  }
}

function startGame() {
  const count = document.getElementById('playerCount').value;
  players = [];
  for (let i = 0; i < count; i++) {
    const name = document.getElementById(`p${i}`).value || `Pelaaja ${i + 1}`;
    players.push(name);
  }
  scores = new Array(players.length).fill(0);
  target = parseInt(document.getElementById('targetScore').value);
  diceCount = parseInt(document.getElementById('diceCount').value);
  currentPlayer = 0;
  turnScore = 0;
  tripleDoubles = 0;

  setupDiv.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  updateUI();
}

function rollDice() {
  const rolls = Array.from({ length: diceCount }, () => Math.ceil(Math.random() * 6));
  diceArea.textContent = rolls.join(' 🎲 ');

  if (diceCount === 1) {
    const roll = rolls[0];
    if (roll === 1) {
      turnScore = 0;
      nextPlayer();
    } else {
      turnScore += roll;
    }
  } else {
    const [d1, d2] = rolls;
    if (d1 === 1 && d2 === 1) {
      turnScore += 25;
      nextPlayer();
    } else if (d1 === 1 || d2 === 1) {
      turnScore = 0;
      nextPlayer();
    } else if (d1 === d2) {
      tripleDoubles++;
      if (tripleDoubles === 3) {
        turnScore = 0;
        nextPlayer();
      } else {
        turnScore += (d1 + d2) * 2;
      }
    } else {
      tripleDoubles = 0;
      turnScore += d1 + d2;
    }
  }
  updateUI();
}

function holdScore() {
  scores[currentPlayer] += turnScore;
  if (scores[currentPlayer] >= target) {
    alert(`${players[currentPlayer]} voitti pelin!`);
    location.reload();
  } else {
    nextPlayer();
  }
}

function nextPlayer() {
  turnScore = 0;
  tripleDoubles = 0;
  currentPlayer = (currentPlayer + 1) % players.length;
  updateUI();
}

function updateUI() {
  turnInfo.textContent = `Vuorossa: ${players[currentPlayer]}`;
  turnScoreSpan.textContent = turnScore;
  scoreBoard.innerHTML = players.map((p, i) =>
    `<li>${p}: ${scores[i]} pistettä</li>`).join('');
}
