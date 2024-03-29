// Constants and Data
const choices = ["rock", "paper", "scissors"];
const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌"
}
const outcomeMessages = {
    draw: "It's a draw.",
    won: "Player won.",
    lost: "Player lost."
}

// Variables
let rounds = 0;
const scores = {
    player: 0,
    computer: 0
}

// Eventlistener
const choiceButtons = document.querySelectorAll(".choices > button");
choiceButtons.forEach(choice => {
    choice.addEventListener("click", computeRound);
})

function getComputerChoice() {
    let chosen_index = Math.floor(3 * Math.random());
    return choices[chosen_index];
}

function updateScoreBoard(scores) {
    const playerScore = document.querySelector(".player .score");
    const computerScore = document.querySelector(".computer .score");
    playerScore.innerText = scores.player;
    computerScore.innerText = scores.computer;
}

function displayRoundResult(round, playerChoice, computerChoice, outcome) {
    const results = document.querySelector(".results");

    const result = document.createElement("div");
    result.classList.add("result-card");
    result.innerHTML = `
        <div class="number">
            ${round}
        </div>
        <div class="content">
            <div class="round-result">
                <span class="emoji">${emojis[playerChoice]}</span>
                vs
                <span class="emoji">${emojis[computerChoice]}</span>
            </div>
            <div class="message">${outcome}</div>
        </div>
    `;
    results.appendChild(result);
}

function displayGameResult(gameResult) {
    const info = document.querySelector(".container .info");

    const title = info.querySelector("h3");
    title.innerText = gameResult;

    info.querySelector("div").remove();
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
    displayDiv.innerHTML = "";

    const choices = document.querySelector(".choices");
    const choiceButtons = choices.querySelectorAll("button");
    choiceButtons.forEach(choice => {
        choice.removeAttribute("disabled");
    })

    const resetButton = document.getElementById("reset-button");
    resetButton.remove();

    const info = document.querySelector(".container .info");
    info.innerHTML = `
        <h3>Round <span id="round-counter">1</span></h3>
        <div>Make your choice!</div>
    `
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

function computeFinalResult(scores) {
    let gameResult;
    if (scores.player > scores.computer) {
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

    updateScoreBoard(scores);

    if (scores.player == 5 || scores.computer == 5) {
        let gameResult = computeFinalResult(scores);
        displayGameResult(gameResult);
        setEndGameState();
    } else {
        const roundCounter = document.getElementById("round-counter");
        roundCounter.innerText = rounds + 1;
    }
}