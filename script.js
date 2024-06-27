const startButton = document.getElementById('startButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const startMenu = document.querySelector('.start-menu');
const gameContainer = document.querySelector('.game-container');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const timerText = document.getElementById('time');
let playerXName = 'Player X';
let playerOName = 'Player O';
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let timer = 15;
let interval;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', () => {
    playerXName = playerXInput.value || 'Player X';
    playerOName = playerOInput.value || 'Player O';
    startMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    statusText.textContent = `${playerXName}'s turn`;
    resetTimer();
});

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    if (isGameActive) {
        switchPlayer();
        resetTimer();
    }
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    } 

    if (roundWon) {
        statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins! Press restart to play another game.`;
        isGameActive = false;
        clearInterval(interval);
        return;
    }
    if (checkResult)

    if (!board.includes('')) {
        statusText.textContent = 'Draw! Press restart game to play another game.';
        isGameActive = false;
        clearInterval(interval);
        return;
    }

    statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetTimer = () => {
    clearInterval(interval);
    timer = 15;
    timerText.textContent = timer;
    interval = setInterval(() => {
        timer--;
        timerText.textContent = timer;
        if (timer === 0) {
            switchPlayer();
            statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
            resetTimer();
        }
    }, 1000);
};  

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `${playerXName}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    resetTimer();
};


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

resetTimer(); 

