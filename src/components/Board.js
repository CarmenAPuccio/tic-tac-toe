import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winningSquares }) => (
  <div>
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          isWinning={
            winningSquares && winningSquares.includes(i) ? true : false
          }
          key={i}
          value={square}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  </div>
);

export default Board;
