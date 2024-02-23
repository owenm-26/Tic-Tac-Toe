import { useState } from "react";

// Represents each square object
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Checks whether someone has won
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Board object that handles squares
function Board({ turn, squares, onPlay }) {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = turn;
    onPlay(nextSquares);
  };

  // Winning? Or playing
  const winner = calculateWinner(squares);
  var status; //*derived state variable* because status changes every time calculateWinner() returns which works off of a useState var (squares)

  if (winner) {
    status = "Winner: " + winner + "!!!";
  } else {
    status = turn + " is up.";
  }

  return (
    <>
      <div className="whole-board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [turn, setTurn] = useState("X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    if (turn == "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    if (nextMove % 2 == 0) {
      setTurn("X");
    } else {
      setTurn("O");
    }
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
      console.log("move", move);
    } else {
      description = "Go to beginning of game";
    }

    return (
      <li key={move}>
        <button className="button-13" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board turn={turn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol className="list">{moves}</ol>
      </div>
    </div>
  );
}
