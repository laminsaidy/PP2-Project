// Initializing variables for the game state
let playerScore = 0;  // Player's score
let computerScore = 0;  // Computer's score
let playerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];  // List of player's available choices
let computerChoices = [...playerChoices];  // Copy of playerChoices for the computer's choices
let playerSelection;  // Variable to store the player's selection
let computerSelection;  // Variable to store the computer's selection
let roundsPlayed = 0;  // Track the number of rounds played
let maxRounds = 5;  // Set the maximum number of rounds

// Hiding the choices container initially and clearing the scoreboard
const choicesContainer = document.getElementById('choices');
choicesContainer.style.display = 'none';
document.getElementById('player-score').textContent = '';
document.getElementById('computer-score').textContent = '';

// Start game function
function startGame() {
    const usernameInput = document.getElementById('username');
    
    // Check if the player has entered a name
    if (usernameInput.value.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    // Store the player's name in local storage
    const username = usernameInput.value;
    localStorage.setItem('playerName', username);
    
    // Display welcome message and instructions
    document.getElementById('instructions').innerHTML = `<strong>Welcome, ${username}!</strong><br>Please choose your move.`;
    
    // Show the choices container and scoreboard
    choicesContainer.style.display = 'block';
    document.getElementById('scoreboard').style.display = 'block';
    document.getElementById('playAgainBtn').style.display = 'none';  // Hide play again button initially
    document.getElementById('player-score').textContent = 'Player Score: 0';
    document.getElementById('computer-score').textContent ='Computer Score: 0';
    
    // Hide the username and start game button
    document.getElementById('username').style.display = 'none';
    document.getElementById('playgame').style.display = 'none';
    
    // Display past scores from local storage
    showPastScores();
}

// Load stored username when the page loads
window.onload = function() {
    const storedUsername = localStorage.getItem('playerName');
    if (storedUsername) {
        document.getElementById('username').value = storedUsername;  // Auto-fill the username field if found
    }
    showPastScores();  // Display past scores on page load
};

// Add event listener to each choice button
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        playerSelection = button.value;  // Store the player's selection
        computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)];  // Randomly choose for the computer
        playRound();  // Start the round
    });
});

// Function to play a round
function playRound() {
    let result = determineWinner(playerSelection, computerSelection);  // Determine the winner of the round
    updateScores(result);  // Update the scores based on the round result
    displayRoundResult(result);  // Display the result of the round
    checkGameOver();  // Check if the game is over
}

// Function to determine the winner of a round
function determineWinner(player, computer) {
    // Draw condition: if both selections are the same
    if (player === computer) return 'draw';

    // Winning conditions for the player
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

// Function to update the scores after each round
function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;  // Increment player score
    } else if (winner === 'computer') {
        computerScore++;  // Increment computer score
    }
    
    // Update score display on the page
    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computer-score').textContent = `Computer Score: ${computerScore}`;
}

// Function to display the result of the round
function displayRoundResult(result) {
    document.getElementById('computer-choice').textContent = `Computer chose: ${computerSelection}`;
    document.getElementById('result-text').innerHTML = `Result: ${result === 'draw'? 'It\'s a draw!' : result === 'player'? 'You win this round!' : 'You lose this round!'}`;
}

// Function to check if the game is over (after the max rounds)
function checkGameOver() {
    roundsPlayed++;  // Increment the rounds played
    if (roundsPlayed >= maxRounds) {  // Check if maximum rounds are reached
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');  // Retrieve past scores from local storage
        scores.push({ playerName: localStorage.getItem('playerName'), playerScore, computerScore });  // Add the current game scores
        scores.sort((a, b) => b.playerScore - a.playerScore);  // Sort the scores by player score
        localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5)));  // Store the top 5 scores in local storage
        
        // Hide the choices and show the game over result
        document.getElementById('choices').style.display = 'none';
        document.getElementById('game-result').innerHTML = `<strong>Game Over!</strong><br>Player Score: ${playerScore}<br>Computer Score: ${computerScore}<br><br>Final Result: ${playerScore > computerScore? 'You won the game!' : playerScore < computerScore? 'You lost the game.' : 'The game was a draw.'}`;
        
        // Show play again button
        document.getElementById('playAgainBtn').style.display = 'block';
    }
}

// Add event listener to the play again button to reset the game
document.getElementById('playAgainBtn').addEventListener('click', () => {
    playerScore = 0;  // Reset scores
    computerScore = 0;
    roundsPlayed = 0;  // Reset rounds played
    location.reload();  // Reload the page to start a new game
});

// Add event listener to the back to main page button
document.getElementById('backToMainPageBtn').addEventListener('click', () => {
    window.location.href = "index.html";  // Redirect to the main page
});

// Function to display the past scores from local storage
function showPastScores() {
    const scoresStr = localStorage.getItem('scores');  // Get stored scores
    if (!scoresStr) {
        console.error("No scores found in local storage.");  // Error if no scores are found
        return;
    }
    
    const scoresArr = JSON.parse(scoresStr);  // Parse the scores string to an array
    console.log("Retrieved scores:", scoresArr);  // Log retrieved scores

    scoresArr.sort((a, b) => b.playerScore - a.playerScore);  // Sort the scores by player score in descending order

    // Get the table body for displaying scores
    const scoresTableBody = document.querySelector('#past-scores-table tbody');
    scoresTableBody.innerHTML = '';  // Clear any existing scores

    // Add each score to the table
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
