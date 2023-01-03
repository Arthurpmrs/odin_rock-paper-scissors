const choices = ["rock", "paper", "scissors"];

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
    let message;
    if (playerChoice === computerChoice) {
        message = `Draw! (${playerChoice})`;
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        message = `Player won! ${playerChoice} beats ${computerChoice}`;
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        message = `Player won! ${playerChoice} beats ${computerChoice}`;
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        message = `Player won! ${playerChoice} beats ${computerChoice}`;
    } else {
        message = `Player loses! ${computerChoice} beats ${playerChoice}`;
    }
    return message;
}
