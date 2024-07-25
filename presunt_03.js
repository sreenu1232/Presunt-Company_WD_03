let board;
let currentPlayer;
let gameActive;

// DOM elements
const cells = Array.from(document.getElementsByClassName('cell'));
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Initialize game
function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, {
            once: true
        });
    });
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cells.indexOf(cell);

    // If cell is already taken or game is not active, do nothing
    if (!gameActive || board[cellIndex] !== '') return;

    // Place marker
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for win
    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (checkDraw()) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    return winConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return board.every(cell => {
        return cell !== '';
    });
}

// Reset game
function resetGame() {
    initializeGame();
}

// Event listeners
resetBtn.addEventListener('click', resetGame);

// Initialize game on page load
initializeGame();
