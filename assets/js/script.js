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

    window.onload = function () {
        const storedUsername = localStorage.getItem('playerName');
        if (storedUsername) {
            document.getElementById('username').value = storedUsername;
        }
        showPastScores();
    };

    // Event listener for player choices
    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', () => {
            playerSelection = button.value;
            computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)];
            playRound();
        });
    });

    // Function to play a round
    function playRound() {
        let result = determineWinner(playerSelection, computerSelection);
        updateScores(result);
        displayRoundResult(result);
        checkGameOver();
    }

    // Function to determine the winner of a round
    function determineWinner(player, computer) {
        if (player === computer) return 'draw';
        if ((player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper') ||
            (player === 'lizard' && computer === 'spock') ||
            (player === 'spock' && computer === 'rock') ||
            (player === 'rock' && computer === 'lizard') ||
            (player === 'paper' && computer === 'spock') ||
            (player === 'scissors' && computer === 'lizard') ||
            (player === 'lizard' && computer === 'paper') ||
            (player === 'spock' && computer === 'scissors')) {
            return 'player';
        }
        return 'computer';
    }

    // Function to update the scores
    function updateScores(winner) {
        if (winner === 'player') {
            playerScore++;
        } else if (winner === 'computer') {
            computerScore++;
        }
        document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computer-score').textContent = `Computer Score: ${computerScore}`;
    }

    // Function to display round results
    function displayRoundResult(result) {
        document.getElementById('computer-choice').textContent = `Computer chose: ${computerSelection}`;
        document.getElementById('result-text').innerHTML = `Result: ${result === 'draw' ? 'It\'s a draw!' : result === 'player' ? 'You win this round!' : 'You lose this round!'}`;
    }

    // Function to check if the game is over
    function checkGameOver() {
        roundsPlayed++;
        if (roundsPlayed >= maxRounds) {
            const scores = JSON.parse(localStorage.getItem('scores') || '[]');
            scores.push({ playerName: localStorage.getItem('playerName'), playerScore, computerScore });
            scores.sort((a, b) => b.playerScore - a.playerScore);
            localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5)));
            document.getElementById('choices').style.display = 'none';
            document.getElementById('game-result').innerHTML = `<strong>Game Over!</strong><br>Player Score: ${playerScore}<br>Computer Score: ${computerScore}<br><br>Final Result: ${playerScore > computerScore ? 'You won the game!' : playerScore < computerScore ? 'You lost the game.' : 'The game was a draw.'}`;
            document.getElementById('playAgainBtn').style.display = 'block';
        }
    }

    // Event listener for "Play Again" button
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        location.reload();
    });

    // Event listener for "Back to Main Page" button
    document.getElementById('backToMainPageBtn').addEventListener('click', () => {
        window.location.href = "index.html";
    });

    // Function to show past scores
    function showPastScores() {
        const scoresStr = localStorage.getItem('scores');
        if (!scoresStr) {
            console.error("No scores found in local storage.");
            return;
        }
        const scoresArr = JSON.parse(scoresStr);
        scoresArr.sort((a, b) => b.playerScore - a.playerScore);

        const scoresTableBody = document.querySelector('#past-scores-table tbody');
        scoresTableBody.innerHTML = ''; // Clear existing scores

        scoresArr.forEach(scoreObj => {
            scoresTableBody.innerHTML += `
                <tr>
                    <td>${scoreObj.playerName}</td>
                    <td>${scoreObj.playerScore}</td>
                    <td>${scoreObj.computerScore}</td>
                </tr>
            `;
        });
    }

    // Assigning the startGame function to the button's onclick event
    const startButton = document.getElementById('startGameBtn');
    if (startButton) {
        startButton.onclick = startGame;
    }
});
