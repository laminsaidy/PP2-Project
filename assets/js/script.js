let playerScore = 0;
let computerScore = 0;
let playerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
let computerChoices = [...playerChoices];
let playerSelection;
let computerSelection;
let roundsPlayed = 0;
let maxRounds = 5;

const choicesContainer = document.getElementById('choices');
if (choicesContainer) choicesContainer.style.display = 'none';

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
if (playerScoreElement) playerScoreElement.textContent = '';
if (computerScoreElement) computerScoreElement.textContent = '';

document.getElementById('startGameBtn').addEventListener('click', startGame);

function startGame() {
    // Start game logic here
    alert('Game has started!');
}

function startGame() {
    const usernameInput = document.getElementById('username');
    if (usernameInput && usernameInput.value.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    const username = usernameInput ? usernameInput.value : '';
    localStorage.setItem('playerName', username);
    const instructions = document.getElementById('instructions');
    if (instructions) instructions.innerHTML = `<strong>Welcome, ${username}!</strong><br>Please choose your move.`;
    
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

window.onload = function() {
    const storedUsername = localStorage.getItem('playerName');
    if (storedUsername) {
        const usernameInput = document.getElementById('username');
        if (usernameInput) usernameInput.value = storedUsername;
    }
    showPastScores(); 
};

document.querySelectorAll('.choice').forEach(button => {
    if (button) {
        button.addEventListener('click', () => {
            playerSelection = button.value;
            computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)];
            playRound();
        });
    }
});

function playRound() {
    let result = determineWinner(playerSelection, computerSelection);
    updateScores(result);
    displayRoundResult(result);
    checkGameOver();
}

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
        (player === 'spock' && computer === 'scissors')) 
    {
        return 'player';
    }
    return 'computer';
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    if (playerScoreElement) playerScoreElement.textContent = `Player Score: ${playerScore}`;
    if (computerScoreElement) computerScoreElement.textContent = `Computer Score: ${computerScore}`;
}

function displayRoundResult(result) {
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultTextElement = document.getElementById('result-text');
    
    if (computerChoiceElement) computerChoiceElement.textContent = `Computer chose: ${computerSelection}`;
    if (resultTextElement) resultTextElement.innerHTML = `Result: ${result === 'draw' ? 'It\'s a draw!' : result === 'player' ? 'You win this round!' : 'You lose this round!'}`;
}

function checkGameOver() {
    roundsPlayed++;
    if (roundsPlayed >= maxRounds) {
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push({ playerName: localStorage.getItem('playerName'), playerScore, computerScore });
        scores.sort((a, b) => b.playerScore - a.playerScore);
        localStorage.setItem('scores', JSON.stringify(scores.slice(0, 5)));
        
        const choices = document.getElementById('choices');
        if (choices) choices.style.display = 'none';
        
        const gameResult = document.getElementById('game-result');
        if (gameResult) gameResult.innerHTML = `<strong>Game Over!</strong><br>Player Score: ${playerScore}<br>Computer Score: ${computerScore}<br><br>Final Result: ${playerScore > computerScore ? 'You won the game!' : playerScore < computerScore ? 'You lost the game.' : 'The game was a draw.'}`;
        
        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) playAgainBtn.style.display = 'block';
    }
}

const playAgainBtn = document.getElementById('playAgainBtn');
if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        location.reload();
    });
}

const backToMainPageBtn = document.getElementById('backToMainPageBtn');
if (backToMainPageBtn) {
    backToMainPageBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}

function showPastScores() {
    const scoresStr = localStorage.getItem('scores');
    if (!scoresStr) {
        console.error("No scores found in local storage.");
        return;
    }
    const scoresArr = JSON.parse(scoresStr);
    scoresArr.sort((a, b) => b.playerScore - a.playerScore);

    const scoresTableBody = document.querySelector('#past-scores-table tbody');
    if (scoresTableBody) scoresTableBody.innerHTML = ''; 

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
