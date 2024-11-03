const board = Array(9).fill(null);
const player = 'X';
const aiPlayer = 'O';

function renderBoard() {
  board.forEach((mark, i) => {
    const cell = document.querySelectorAll('.cell')[i];
    cell.textContent = mark;
    cell.className = `cell ${mark ? mark.toLowerCase() : ''}`;
  });
}

function makeMove(index) {
  if (!board[index] && !checkWin(board, player) && !checkWin(board, aiPlayer)) {
    board[index] = player;
    renderBoard();
    if (!checkWin(board, player) && board.includes(null)) {
      const aiMove = minimax(board, aiPlayer).index;
      board[aiMove] = aiPlayer;
      renderBoard();
    }
  }
}

function resetGame() {
  board.fill(null);
  renderBoard();
}

function minimax(newBoard, currentPlayer) {
  const availableMoves = newBoard.map((v, i) => (v === null ? i : null)).filter(v => v !== null);

  if (checkWin(newBoard, player)) return { score: -10 };
  if (checkWin(newBoard, aiPlayer)) return { score: 10 };
  if (availableMoves.length === 0) return { score: 0 };

  const moves = availableMoves.map(index => {
    const move = { index };
    newBoard[index] = currentPlayer;
    const result = minimax(newBoard, currentPlayer === aiPlayer ? player : aiPlayer);
    move.score = result.score;
    newBoard[index] = null;
    return move;
  });

  return currentPlayer === aiPlayer
    ? moves.reduce((best, move) => (move.score > best.score ? move : best))
    : moves.reduce((best, move) => (move.score < best.score ? move : best));
}

function checkWin(board, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
  ];
  return winPatterns.some(pattern => pattern.every(i => board[i] === player));
}

renderBoard();
