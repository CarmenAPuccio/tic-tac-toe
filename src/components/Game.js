import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import Board from "./Board";

const Game = () => {
  // -------------------------------- use State --------------------------------
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), index: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [isAscending, setAscending] = useState(true);

  const currentBoard = history[stepNumber];
  const winningInfo = calculateWinner(currentBoard.squares);
  const winner = winningInfo.winner;

// -------------------------------- status --------------------------------

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (winningInfo.isDraw) {
    status = "The Game is a draw!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  // -------------------------------- handleClick --------------------------------

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const squares = currentBoard.squares.slice();
    // If user click an occupied square or if game is won, return
    if (winner || squares[i]) {
      return;
    }
    // Put an X or an O in the clicked square
    squares[i] = xIsNext ? "X" : "O";
    // set the time in history and pass squares to give the most recent state
    setHistory(
      timeInHistory.concat([
        {
          squares: squares,
          index: i,
        },
      ])
    );
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  };

  // -------------------------------- jumpTo --------------------------------
  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  // -------------------------------- handleSortToggle --------------------------------
  // sorts the historyMoveList
  const handleSortTogggle = () => {
    setAscending(!isAscending);
  };

    // -------------------------------- restartGame --------------------------------

  const restartGame = () => (
    <button
      className="game-button"
      onClick={() => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setXisNext(true);
        setStepNumber(history.length);
        setStepNumber(0);
      }}
    >
      New Game
    </button>
  );

  // -------------------------------- historyMovesList --------------------------------
  const historyMovesList = history.map((step, move) => {
    //const destination = move ? "Go to Move #" + move : "Go to the Start";
    const destination = move
      ? "Go to Move #" +
        move +
        " Row: " +
        Math.floor(step.index / 3) +
        " Col: " +
        (step.index % 3)
      : " Go to the Start";
    return (
      <li className="game-history__list" key={move}>
        <button
          className={
            move === stepNumber ? "game-button current-move" : "game-button"
          }
          onClick={() => {
            jumpTo(move);
          }}
        >
          {destination}
        </button>
      </li>
    );
  });

  if (!isAscending) {
    historyMovesList.reverse();
  }

 // -------------------------------- return --------------------------------

  return (
    <div className="game-grid__container">
      <div className={winner ? "game disabled" : "game"}>
        <div className="game-info">
        <p>{status}</p>
        </div>
        <div className="game-board">
          <Board
            winningSquares={winner ? winningInfo.line : []}
            squares={currentBoard.squares}
            onClick={(i) => handleClick(i)}
          />
        </div>
      </div>
      <div class="game-history">
        <div class="game-history__section">
          <div>
            {restartGame()}
            <button className="game-button" onClick={() => handleSortTogggle()}>
              {isAscending ? "Sort Descending" : "Sort Ascending"}
            </button>
            {historyMovesList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
