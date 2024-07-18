const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word");
const guessedText = document.querySelector(".guessed-text b");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");
const showHint = document.querySelector(".show-hint");
const hint = document.querySelector(".hint");

let currentWord, currectLetter = [], wrongGuessCount = 0;
const maxGuesses = 6;
const resetGame = () => {
    currectLetter = [];
    wrongGuessCount = 0;
    hangmanImage.src = `./${wrongGuessCount}.jpg`;
    guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModel.classList.remove("show");

}
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    // console.log(word, hint);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    // wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");

}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modelText = isVictory ? `You found the word : ` : `The correct word was:`;
        gameModel.querySelector('img').src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrates' : 'Game Over'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");

    })
}
const initGame = (button, clickedLetter) => {
    // console.log(clickedLetter);
    if (currentWord.includes(clickedLetter)) {
        // console.log(clickedLetter,"yes")
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                currectLetter.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else {
        // console.log(clickedLetter,"no")
        wrongGuessCount++;
        hangmanImage.src = `./images/${wrongGuessCount}.jpg`;
    }
    button.disabled = true;
    guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (currectLetter.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord)