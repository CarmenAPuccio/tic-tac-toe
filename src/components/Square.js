import React from "react";

function Square(props) {
  return (
    <button
      className={
        "square" +
        (props.value ? " disabled" : "") +
        (props.isWinning ? " winning" : "")
      }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
