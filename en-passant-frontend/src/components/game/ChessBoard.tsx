import React, { Component } from "react";
import "../../assets/css/board.css";
import Square from "./Square";

function isEven(num: number) {
  return num % 2 === 0;
}

class ChessBoard extends Component {
  renderSquare(shadeSquare: string) {
    return <Square shade={shadeSquare} />;
  }

  render() {
    const board: JSX.Element[] = [];
    for (let i: number = 0; i < 8; i++) {
      const squareRows = [];
      for (let j: number = 0; j < 8; j++) {
        const shadeSquare =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? "light-square"
            : "dark-square";
        squareRows.push(this.renderSquare(shadeSquare));
      }
      board.push(<div className="board-row">{squareRows}</div>);
    }
    return <div>{board}</div>;
  }
}

export default ChessBoard;
