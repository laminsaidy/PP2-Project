// Initialize the game state variables
let playerScore = 0;  // Player's score
let computerScore = 0;  // Computer's score
let playerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];  // List of possible player choices
let computerChoices = [...playerChoices];  // Copy of player choices for computer
let playerSelection;  // Store the player's selection
let computerSelection;  // Store the computer's selection
let roundsPlayed = 0;  // Count the number of rounds played
let maxRounds = 5;  // Maximum rounds to play

// Hide the choices container initially
const choicesContainer = document.getElementById('choices');
choicesContainer.style.display = 'none';
// Reset the scores display
document.getElementById('player-score').textContent = '';
document.getElementById('computer-score').textContent = '';

// Function to start the game
function startGame() {
    const usernameInput = document.getElementById('username');
    
    // Check if the username is empty
    if (usernameInput.value.trim() === '') {
        alert('Please enter your name.');  // Alert if name is missing
        return;
    }

    // Store the player's name in local storage and update the instructions
    const username = usernameInput.value;
    localStorage.setItem('playerName', username);
    document.getElementById('instructions').innerHTML = `<strong>Welcome, ${username}!</strong><br>Please choose your move.`;
    
    // Show game UI elements after starting the game
    choicesContainer.style.display = 'block';
    document.getElementById('scoreboard').style.display = 'block';
    document.getElementById('playAgainBtn').style.display = 'none';
    document.getElementById('player-score').textContent = 'Player Score: 0';
    document.getElementById('computer-score').textContent = 'Computer Score: 0';
    document.getElementById('username').style.display = 'none';
    document.getElementById('playgame').style.display = 'none';
   
    showPastScores();  // Show past scores from local storage
}

// When the page loads, populate username input if stored in localStorage
window.onload = function() {
    const storedUsername = localStorage.getItem('playerName');
    if (storedUsername) {
        document.getElementById('username').value = storedUsername;
    }
    showPastScores();  // Show past scores when the game page loads
};

// Add event listeners for each player's choice
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        playerSelection = button.value;  // Set player selection
        computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)];  // Randomly select computer's move
        playRound();  // Play a round with the selected choices
    });
});

// Function to play a round and determine the winner
function playRound() {
    let result = determineWinner(playerSelection, computerSelection);  // Determine round winner
    updateScores(result);  // Update scores based on the round result
    displayRoundResult(result);  // Display the round's result
    checkGameOver();  // Check if the game is over after the round
}

// Function to determine the winner between player and computer
function determineWinner(player, computer) {
    if (player === computer) return 'draw';  // If both choices are the same, it's a draw
    // Check for all winning conditions
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') || 
        (player === 'scissors' && computer === 'paper') || 
        (player === 'lizard' && computer === 'spock') || 
        (player === 'spock' && computer === 'rock') ||
        (player === 'rock' && computer === 'lizard') ||
        (player === 'paper' && computer === 'spock') ||
        (player === 'scissors' && computer === 'lizard') ||
        (player === 'lizard' && computer === 'paper') ||
        (player === 'spock' && computer === 'scissors')) 
    {
        return 'player';  // Player wins
    }
    return 'computer';  // Computer wins
}

// Function to update the scores
function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;  // Increment player's score
    } else if (winner === 'computer') {
        computerScore++;  // Increment computer's score
    }
    // Update score displays
    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computer-score').textContent = `Computer Score: ${computerScore}`;
}

// Function to display the round result
function displayRoundResult(result) {
    document.getElementById('computer-choice').textContent = `Computer chose: ${computerSelection}`;
    document.getElementById('result-text').innerHTML = `Result: ${result === 'draw' ? 'It\'s a draw!' : result === 'player' ? 'You win this round!' : 'You lose this round!'}`;
}

// Function to check if the game is over after a round
function checkGameOver() {
    roundsPlayed++;  // Increment the number of rounds played
    if (roundsPlayed >= maxRounds) {  // If max rounds are reached
        // Save the scores in local storage
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push({ playerName: localStorage.getItem('playerName'), playerScore, computerScore });
        scores.sort((a, b) => b.playerScore - a.playerScore);  // Sort scores by player score
        localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5)));  // Store top 5 scores
        // Hide choices and display game over result
        document.getElementById('choices').style.display = 'none';
        document.getElementById('game-result').innerHTML = `<strong>Game Over!</strong><br>Player Score: ${playerScore}<br>Computer Score: ${computerScore}<br><br>Final Result: ${playerScore > computerScore ? 'You won the game!' : playerScore < computerScore ? 'You lost the game.' : 'The game was a draw.'}`;
        document.getElementById('playAgainBtn').style.display = 'block';  // Show play again button
    }
}

// Event listener for play again button to reset the game
document.getElementById('playAgainBtn').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    location.reload();  // Reload the page to reset the game
});

// Event listener for back to main page button to redirect to index.html
document.getElementById('backToMainPageBtn').addEventListener('click', () => {
    window.location.href = "index.html";  // Redirect to main page
});

// Function to show past scores from local storage
function showPastScores() {
    const scoresStr = localStorage.getItem('scores');
    if (!scoresStr) {
        console.error("No scores found in local storage.");
        return;
    }
    const scoresArr = JSON.parse(scoresStr);  // Parse stored scores

    console.log("Retrieved scores:", scoresArr);  // Log retrieved scores

    scoresArr.sort((a, b) => b.playerScore - a.playerScore);  // Sort scores in descending order

    const scoresTableBody = document.querySelector('#past-scores-table tbody');
    scoresTableBody.innerHTML = '';  // Clear the table body before adding new rows

    // Add each score as a new row in the scores table
    scoresArr.forEach(scoreObj => {
        scoresTableBody.innerHTML += `
            <tr>
                <td>${scoreObj.playerName}</td>
                <td>${scoreObj.playerScore}</td>
                <td>${scoreObj.computerScore}</td>
            </tr>
        `;
    });

    console.log("Displayed scores:", scoresArr);  // Log displayed scores
}
