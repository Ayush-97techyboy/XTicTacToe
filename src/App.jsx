import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, Draws: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winInfo = calculateWinner(newBoard);
    if (winInfo) {
      setScores((prev) => ({ ...prev, [winInfo.winner]: prev[winInfo.winner] + 1 }));
    } else if (!newBoard.includes(null)) {
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  };

  const restartRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, Draws: 0, O: 0 });
  };

  // Evaluate win and draw conditions
  const winInfo = calculateWinner(board);
  const isDraw = !winInfo && !board.includes(null);

  // Set visual status message
  let status;
  if (winInfo) {
    status = `Winner: ${winInfo.winner}`;
  } else if (isDraw) {
    status = "Draw";
  } else {
    status = `Turn: ${isXNext ? "X" : "O"}`;
  }

  // Keyboard accessibility handler for cells
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(index);
    }
  };

  const renderCell = (index) => {
    const isWinCell = winInfo && winInfo.line.includes(index);
    return (
      <div
        className={`cell ${board[index] || ""} ${isWinCell ? "win" : ""}`}
        onClick={() => handleClick(index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        role="button"
        tabIndex="0"
        aria-label={`Cell ${index}`}
      >
        {board[index] && board[index].toLowerCase()}
      </div>
    );
  };

  return (
    <>
      <section id="center">
        <div className="board">
          <h1>Tic-Tac-Toe</h1>
          <div className="score">
            <div className="X">X: {scores.X} </div>
            <div className="Draws">Draws: {scores.Draws}</div>
            <div className="O">O: {scores.O}</div>
          </div>
          <div className="status">{status}</div>
          <div className="row">
            {renderCell(0)}
            {renderCell(1)}
            {renderCell(2)}
          </div>
          <div className="row">
            {renderCell(3)}
            {renderCell(4)}
            {renderCell(5)}
          </div>
          <div className="row">
            {renderCell(6)}
            {renderCell(7)}
            {renderCell(8)}
          </div>
          <div className="buttons">
            <button className="restartRound" onClick={restartRound}>
              {winInfo || isDraw ? "Play Again" : "Restart Round"}
            </button>
            <button className="resetGame" onClick={resetAll}>
              Reset All
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
