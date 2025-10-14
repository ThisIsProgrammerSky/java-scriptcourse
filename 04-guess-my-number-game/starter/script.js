'use strict';

console.log('=== DOM ELEMENT SELECTION ===');

// Constants
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;
const START_SCORE = 20;

// Cached selectors
const bodyEl = document.body;
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessInputEl = document.querySelector('.guess');
const checkBtnEl = document.querySelector('.check');
const againBtnEl = document.querySelector('.again');

// Utility functions
function setMessage(text) {
  messageEl.textContent = text;
}
function setNumber(value) {
  numberEl.textContent = value;
}
function setScore(value) {
  scoreEl.textContent = value;
}
function setHighscore(value) {
  highscoreEl.textContent = value;
}
function setBackground(color) {
  bodyEl.style.backgroundColor = color;
}
function disablePlay(disabled) {
  guessInputEl.disabled = disabled;
  checkBtnEl.disabled = disabled;
}
function clearInput() {
  guessInputEl.value = '';
}
function focusInput() {
  guessInputEl.focus();
}

// Game state variables
let secretNumber;
let score;
let highscore = 0;

// Game initialization
function resetGameState() {
  secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  score = START_SCORE;
}
function renderInitialUI() {
  setMessage('Start guessing...');
  setNumber('?');
  setScore(score);
  clearInput();
  disablePlay(false);
  setBackground('');
  focusInput();
}

// Core game logic
function handleGuess() {
  const guess = Number(guessInputEl.value);

  // Input validation
  if (!guess) return setMessage('No number!');
  if (guess < MIN_NUMBER || guess > MAX_NUMBER)
    return setMessage(`Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}!`);

  // Correct guess
  if (guess === secretNumber) {
    setMessage('Correct Number!');
    setNumber(secretNumber);
    setBackground('green');
    disablePlay(true);
    if (score > highscore) {
      highscore = score;
      setHighscore(highscore);
    }
    return;
  }

  // Wrong guess
  setMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
  score--;
  setScore(score);

  if (score < 1) {
    setMessage('You lost!');
    setNumber(secretNumber);
    setBackground('red');
    disablePlay(true);
  }
}

// Event listeners
checkBtnEl.addEventListener('click', handleGuess);

againBtnEl.addEventListener('click', function () {
  resetGameState();
  renderInitialUI();
});

// Enter key submits the guess
window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !checkBtnEl.disabled) {
    handleGuess();
  }
});

// Initial game start
resetGameState();
renderInitialUI();
