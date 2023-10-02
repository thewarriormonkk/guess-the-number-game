let randomNumber = Math.round(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

// let prevGuess = [];
let guessCount = 1;

let playGame = true;

if (playGame) {
    // console.log('new game started');
    submit.addEventListener('click', (e) => {
        console.log('inside event listener with playGame == true');
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    // console.log('validation');
    if (isNaN(guess)) {
        alert('please enter a valid number');
    } else if (guess < 1) {
        alert('please enter a number >= 1');
    } else if (guess > 100) {
        alert('please enter a number <= 100');
    } else {
        // prevGuess.push(guess);
        if (guessCount == 10) {
            cleanUpGuess(guess);
            displayMessage(`Game Over. Random Number was ${randomNumber}`);
            endGame();
        } else {
            cleanUpGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    // console.log('checking guessedNumber with randomNumber');
    if (guess == randomNumber) {
        displayMessage(`You guessed it right`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('guessed number is smaller than random number');
    } else if (guess > randomNumber) {
        displayMessage('guessed number is bigger than random number');
    }
}

function cleanUpGuess(guess) {
    // console.log('cleaning up things for you');
    userInput.value = '';
    guessSlot.innerHTML += `${guess}   `;
    guessCount++;
    (guessCount > 10) ? remaining.innerHTML = '0' : remaining.innerHTML = `${11 - guessCount}`;

}

function displayMessage(message) {
    // console.log('displaying message')
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
    lowOrHi.setAttribute('style', 'color: yellow;');
}

function endGame() {
    // console.log('now going to end the game');
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();

}

function newGame() {
    // console.log('going to start new game for you')
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', (e) => {
        randomNumber = Math.round(Math.random() * 100 + 1);
        // prevGuess = [];
        guessCount = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - guessCount}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
