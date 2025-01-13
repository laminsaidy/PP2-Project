// Initialize game variables for player and computer scores, choices, and rounds
let playerScore = 0;
let computerScore = 0;
let playerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
let computerChoices = [...playerChoices]; // Computer has the same options as the player
let playerSelection; // Stores player's selection
let computerSelection; // Stores computer's selection
let roundsPlayed = 0; // Counter for the number of rounds played
let maxRounds = 5; // Maximum number of rounds before game ends

// Hide choices container initially
const choicesContainer = document.getElementById('choices');
if (choicesContainer) choicesContainer.style.display = 'none';

// Get elements for displaying player and computer scores
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
if (playerScoreElement) playerScoreElement.textContent = '';
if (computerScoreElement) computerScoreElement.textContent = '';

// Event listener for "Start Game" button
// Check if the element exists before attaching event listener
window.onload = function() {
    // Check if 'startGameBtn' exists and attach the event listener
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }

    // Also, ensure the 'choices' container exists
    const choicesContainer = document.getElementById('choices');
    if (choicesContainer) {
        choicesContainer.style.display = 'none';
    }

    // Other elements
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    if (playerScoreElement) playerScoreElement.textContent = '';
    if (computerScoreElement) computerScoreElement.textContent = '';

    // Load stored username when the page is loaded
    const storedUsername = localStorage.getItem('playerName');
    if (storedUsername) {
        const usernameInput = document.getElementById('username');
        if (usernameInput) usernameInput.value = storedUsername;
    }
    showPastScores(); // Show past scores from localStorage on page load

    // Add event listeners to each choice button for the player to select a move
    document.querySelectorAll('.choice').forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                playerSelection = button.value; // Store player's choice
                computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)]; // Computer randomly chooses
                playRound(); // Play a round
            });
        }
    });

    // Event listener for the "Play Again" button
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            playerScore = 0; // Reset scores
            computerScore = 0;
            roundsPlayed = 0; // Reset rounds played
            location.reload(); // Reload the page to start a new game
        });
    }

    // Event listener for the "Back to Main Page" button
    const backToMainPageBtn = document.getElementById('backToMainPageBtn');
    if (backToMainPageBtn) {
        backToMainPageBtn.addEventListener('click', () => {
            window.location.href = "index.html"; // Redirect to main page
        });
    }
};

// Function to start the game
function startGame() {
    // Get username input and check if it's empty
    const usernameInput = document.getElementById('username');
    if (usernameInput && usernameInput.value.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    const username = usernameInput ? usernameInput.value : '';
    localStorage.setItem('playerName', username); // Store player name in localStorage

    // Display welcome message and game instructions
    const instructions = document.getElementById('instructions');
    if (instructions) instructions.innerHTML = `<strong>Welcome, ${username}!</strong><br>Please choose your move.`;
    
    // Show choices and scoreboard
    if (choicesContainer) choicesContainer.style.display = 'block';
    const scoreboard = document.getElementById('scoreboard');
    if (scoreboard) scoreboard.style.display = 'block';
    
    // Hide play again button initially
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) playAgainBtn.style.display = 'none';

    // Reset scores to 0
    if (playerScoreElement) playerScoreElement.textContent = 'Player Score: 0';
    if (computerScoreElement) computerScoreElement.textContent = 'Computer Score: 0';

    // Hide username input and play game button after the game starts
    const usernameField = document.getElementById('username');
    if (usernameField) usernameField.style.display = 'none';
    
    const playgameButton = document.getElementById('playgame');
    if (playgameButton) playgameButton.style.display = 'none';
    
    // Display past scores from localStorage
    showPastScores();
}

// Function to show past scores stored in localStorage
function showPastScores() {
    const scoresStr = localStorage.getItem('scores');
    if (!scoresStr) {
        console.error("No scores found in local storage.");
        return;
    }
    const scoresArr = JSON.parse(scoresStr);
    scoresArr.sort((a, b) => b.playerScore - a.playerScore); // Sort by player score in descending order

    const scoresTableBody = document.querySelector('#past-scores-table tbody');
    if (scoresTableBody) scoresTableBody.innerHTML = ''; // Clear any existing rows

    // Add each score as a new row in the table
    scoresArr.forEach(scoreObj => {
        if (scoresTableBody) {
            scoresTableBody.innerHTML += `
                <tr>
                    <td>${scoreObj.playerName}</td>
                    <td>${scoreObj.playerScore}</td>
                    <td>${scoreObj.computerScore}</td>
                </tr>
            `;
        }
    });
}

// Function to play a round of the game
function playRound() {
    let result = determineWinner(playerSelection, computerSelection); // Determine the winner of the round
    updateScores(result); // Update the scores based on the result
    displayRoundResult(result); // Display the result of the round
    checkGameOver(); // Check if the game is over (based on max rounds)
}

// Function to determine the winner of a round based on player and computer choices
function determineWinner(player, computer) {
    if (player === computer) return 'draw'; // It's a draw if both choices are the same
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
        return 'player'; // Player wins if their choice beats the computer's choice
    }
    return 'computer'; // Otherwise, the computer wins
}

// Function to update the scores based on the round result
function updateScores(winner) {
    if (winner === 'player') {
        playerScore++; // Increment player score
    } else if (winner === 'computer') {
        computerScore++; // Increment computer score
    }
    if (playerScoreElement) playerScoreElement.textContent = `Player Score: ${playerScore}`;
    if (computerScoreElement) computerScoreElement.textContent = `Computer Score: ${computerScore}`;
}

// Function to display the result of the round
function displayRoundResult(result) {
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultTextElement = document.getElementById('result-text');
    
    if (computerChoiceElement) computerChoiceElement.textContent = `Computer chose: ${computerSelection}`;
    if (resultTextElement) resultTextElement.innerHTML = `Result: ${result === 'draw' ? 'It\'s a draw!' : result === 'player' ? 'You win this round!' : 'You lose this round!'}`;
}

// Function to check if the game is over (based on the max number of rounds)
function checkGameOver() {
    roundsPlayed++; // Increment rounds played
    if (roundsPlayed >= maxRounds) {
        // Game over: Store scores in localStorage and display final results
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push({ playerName: localStorage.getItem('playerName'), playerScore, computerScore });
        scores.sort((a, b) => b.playerScore - a.playerScore); // Sort scores in descending order by player score
        localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5))); // Store top 5 scores

        const choices = document.getElementById('choices');
        if (choices) choices.style.display = 'none'; // Hide choices container

        const gameResult = document.getElementById('game-result');
        if (gameResult) gameResult.innerHTML = `<strong>Game Over!</strong><br>Player Score: ${playerScore}<br>Computer Score: ${computerScore}<br><br>Final Result: ${playerScore > computerScore ? 'You won the game!' : playerScore < computerScore ? 'You lost the game.' : 'The game was a draw.'}`;

        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) playAgainBtn.style.display = 'block'; // Show play again button
    }
}
