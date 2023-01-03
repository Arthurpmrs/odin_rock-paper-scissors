const choices = ["rock", "paper", "scissors"];

const outcomeMessages = {
    draw: "It's a draw.",
    won: "Player won.",
    lost: "Player lost."
}


function getComputerChoice() {
    let chosen_index = Math.floor(3 * Math.random());
    return choices[chosen_index];
}

function getPlayerChoice() {
    let choice;
    
    while (true) {
        choice = prompt("Enter your choice (Rock, paper or scissors): ");

        if (choice == "" || choice == null) {
            return null;
        } else if (!(choices.includes(choice.toLowerCase()))) {
            alert("Invalid entry. Try again!");
        } else {
            return choice.toLocaleLowerCase();
        }
    }

}

function computeRound(playerChoice, computerChoice) {
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

function game(rounds) {
    let computerScore = 0;
    let playerScore = 0;

    for (let i = 0; i < rounds; i++) {
        const playerChoice = getPlayerChoice();
        if (playerChoice === null) {
            console.log("Game interrupted.")
            return false;
        }
        const computerChoice = getComputerChoice();
        let outcome = computeRound(playerChoice, computerChoice);
        console.log(`${playerChoice} X ${computerChoice}: ${outcomeMessages[outcome]}`);
        
        if (outcome === "won") {
            playerScore++;
        } else if (outcome === "lost") {
            computerScore++;
        }
    }

    let finalResult;
    if (playerScore === rounds) {
        finalResult = "Player got a Queen Sweep!"
    } else if (playerScore > computerScore) {
        finalResult = "Player won!"
    } else if (playerScore < computerScore) {
        finalResult = "Player Lost!"
    } else {
        finalResult = "It was a Draw!"
    }

    console.log(`End of game. Total score: ${playerScore} x ${computerScore}. ${finalResult}`)
}

game(5);