const choices = ["rock", "paper", "scissors"];

const outcomes = {
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
    let result;
    if (playerChoice === computerChoice) {
        result = "draw";
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        result = "won"
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        result = "won"
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        result = "won"
    } else {
        result = "lost"
    }
    return result;
}