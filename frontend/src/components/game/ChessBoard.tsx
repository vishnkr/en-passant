import React, {Component} from "react";
import "../../assets/css/board.css";
import Square, {PieceInfo} from "./Square";
import pawn from "../../assets/pieces/black/pawn_black.png";

function isEven(num: number) {
    return num % 2 === 0;
}

/*pawn - "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg", "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
queen- "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
king - "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
bishop - "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
knight - "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
rook - "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
*/
class ChessBoard extends Component {
    renderSquare(
        shadeSquare: string,
        isOccupied: boolean,
        color: string,
        type: string
    ) {
        let info: PieceInfo = {
            isOccupied: isOccupied,
            color: color,
            type: type,
            pieceURL:
                color === "black"
                    ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
                    : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
        };
        return <Square shade={shadeSquare} pieceInfo={info}/>;
    }

    render() {
        var color: string = "black";
        const board: JSX.Element[] = [];
        for (let i: number = 0; i < 8; i++) {
            color = color === "black" ? "white" : "black";
            const squareRows = [];
            for (let j: number = 0; j < 8; j++) {
                color = color === "black" ? "white" : "black";
                const shadeSquare =
                    (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
                        ? "light-square"
                        : "dark-square";
                squareRows.push(this.renderSquare(shadeSquare, true, color, "pawn"));
            }
            board.push(<div className="board-row">{squareRows}</div>);
        }
        return <div>{board}</div>;
    }
}

export default ChessBoard;
