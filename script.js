let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function makeMove(index) {
    if (cells[index].textContent === '') {
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer);

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            disableCells();
        } else if (checkDraw()) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== '' && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', makeMove));
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.addEventListener('click', makeMove);
    });

    currentPlayer = 'X';
    message.textContent = '';
}
