const choices = ["rock", "paper", "scissors"];

const outcomeMessages = {
    draw: "It's a draw.",
    won: "Player won.",
    lost: "Player lost."
}

let rounds = 0;
const scores = {
    player: 0,
    computer: 0
}

const choiceButtons = document.querySelectorAll(".choices > button");
choiceButtons.forEach(choice => {
    choice.addEventListener("click", computeRound);
})

function getComputerChoice() {
    let chosen_index = Math.floor(3 * Math.random());
    return choices[chosen_index];
}

function displayRoundResult(round, playerChoice, computerChoice, outcome) {
    const results = document.querySelector(".results");

    const result = document.createElement("div");
    result.classList.add("result");
    result.innerHTML = `
        <div class="result-info">
            <span>Round ${round}: </span>
            <span>${playerChoice} vs ${computerChoice}</span>
        </div>
        <h5>${outcome}</h5>
    `;
    results.appendChild(result);
}

function displayGameResult(scores, gameResult) {
    const container = document.querySelector(".container");

    const gameResultCard = document.createElement("div");
    gameResultCard.classList.add("game-result");
    gameResultCard.innerHTML = `
        <div class="scores">
            <span>Player </span>
            <span class="score">${scores.player}</span>
            <span>vs</span>
            <span class="score">${scores.computer}</span>
            <span>Computer</span>
        </div>
        <span>${gameResult}</span>
    `;

    container.appendChild(gameResultCard);
}

function setEndGameState() {
    const choices = document.querySelector(".choices");

    const choiceButtons = choices.querySelectorAll("button");
    choiceButtons.forEach(choice => {
        choice.setAttribute("disabled", "");
    })

    const resetButton = document.createElement("button");
    resetButton.setAttribute("id", "reset-button");
    resetButton.innerText = "Play again"
    resetButton.addEventListener("click", event => {
        resetGame();
    })

    choices.appendChild(resetButton);
}

function resetGame() {
    rounds = 0;
    scores.player = 0;
    scores.computer = 0;

    const displayDiv = document.querySelector(".results");
    displayDiv.innerHTML = "<h3>Round History</h3>";

    const choices = document.querySelector(".choices");
    const choiceButtons = choices.querySelectorAll("button");
    choiceButtons.forEach(choice => {
        choice.removeAttribute("disabled");
    })

    const resetButton = document.getElementById("reset-button");
    resetButton.remove();

    const resultCard = document.querySelector(".game-result");
    resultCard.remove();
}

function computeRoundOutcome(playerChoice, computerChoice) {
    let outcome;
    if (playerChoice === computerChoice) {
        outcome = "draw";
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        outcome = "won"
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        outcome = "won"
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        outcome = "won"
    } else {
        outcome = "lost"
    }
    return outcome;
}

function computeFinalResult(scores, rounds) {
    let gameResult;
    if (scores.player === rounds) {
        gameResult = "Player got a Queen Sweep!"
    } else if (scores.player > scores.computer) {
        gameResult = "Player won!"
    } else if (scores.player < scores.computer) {
        gameResult = "Player Lost!"
    } else {
        gameResult = "It was a Draw!"
    }
    return gameResult;
}

function computeRound(event) {
    const playerChoice = event.target.innerText.toLowerCase();
    const computerChoice = getComputerChoice();

    const outcome = computeRoundOutcome(playerChoice, computerChoice);

    rounds++;

    if (outcome === "won") {
        scores.player++;
    } else if (outcome === "lost") {
        scores.computer++;
    }

    displayRoundResult(
        rounds, playerChoice, computerChoice,
        outcomeMessages[outcome]
    );

    if (rounds == 5) {
        let gameResult = computeFinalResult(scores, rounds);
        displayGameResult(scores, gameResult);
        setEndGameState();
    }
}