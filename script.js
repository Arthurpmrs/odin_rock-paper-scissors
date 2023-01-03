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
