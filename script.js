function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let chosen_index = Math.floor(3 * Math.random());
    return choices[chosen_index]
}

console.log(getComputerChoice())