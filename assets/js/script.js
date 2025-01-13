document.addEventListener("DOMContentLoaded", () => {
    // Initializing variables for the game state
    let playerScore = 0; // Player's score
    let computerScore = 0; // Computer's score
    let playerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock']; // List of player's available choices
    let computerChoices = [...playerChoices]; // Copy of playerChoices for the computer's choices
    let playerSelection; // Variable to store the player's selection
    let computerSelection; // Variable to store the computer's selection
    let roundsPlayed = 0; // Track the number of rounds played
    let maxRounds = 5; // Set the maximum number of rounds

    // Hiding the choices container initially and clearing the scoreboard
    const choicesContainer = document.getElementById('choices');
    if (choicesContainer) choicesContainer.style.display = 'none';

    const playerScoreElement = document.getElementById('player-score');
    if (playerScoreElement) playerScoreElement.textContent = '';

    const computerScoreElement = document.getElementById('computer-score');
    if (computerScoreElement) computerScoreElement.textContent = '';

    // Start game function
    function startGame() {
        const usernameInput = document.getElementById('username');
        if (!usernameInput) {
            console.error("Username input field not found.");
            return;
        }

        // Check if the player has entered a name
        if (usernameInput.value.trim() === '') {
            alert('Please enter your name.');
            return;
        }

        // Store the player's name in local storage
        const username = usernameInput.value;
        localStorage.setItem('playerName', username);

        // Display welcome message and instructions
        const instructions = document.getElementById('instructions');
        if (instructions) {
            instructions.innerHTML = `<strong>Welcome, ${username}!</strong><br>Please choose your move.`;
        }

        // Show the choices container and scoreboard
        if (choicesContainer) choicesContainer.style.display = 'block';

        const scoreboard = document.getElementById('scoreboard');
        if (scoreboard) scoreboard.style.display = 'block';

        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) playAgainBtn.style.display = 'none';

        if (playerScoreElement) playerScoreElement.textContent = 'Player Score: 0';
        if (computerScoreElement) computerScoreElement.textContent = 'Computer Score: 0';

        const usernameField = document.getElementById('username');
        if (usernameField) usernameField.style.display = 'none';

        const playgameButton = document.getElementById('playgame');
        if (playgameButton) playgameButton.style.display = 'none';

        showPastScores();
    }

    // Other functions here, unchanged...
});
