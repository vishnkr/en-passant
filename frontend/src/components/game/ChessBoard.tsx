import React, {Component} from "react";
import "./board.css";
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

interface Pieces {
    [type: string] : string;
} 

const ChessBoard: React.FC = () => {
    function renderSquare(
        shadeSquare: string,
        isOccupied: boolean,
        color: string,
        type: string
    ) {
        if(!isOccupied){return <Square shade={shadeSquare} />}
        let info: PieceInfo = {
            color: color,
            type: type,
            pieceURL:
                color == "black"
                    ? blackPieces[type]
                    : whitePieces[type],
        };
        
        return <Square shade={shadeSquare} pieceInfo={info}/>;
    }
    const whitePieces: Pieces  = { "king":"https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg", 
    "queen":"https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg", 
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    "knight": "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    "rook": "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
    };

    const blackPieces : Pieces = { "king":"https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg", 
    "queen":"https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg", 
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    "knight":  "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    "rook":  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
    };
    function setupBoard(){
        const board: JSX.Element[] = [];
        var currentPiece: string = "rook";
        var isOccupied=true;
        for (let row: number = 0; row < 8; row++) {
            
            const squareRows = [];
            
            for (let col: number = 0; col < 8; col++) {
                const shadeSquare =
                    (isEven(row) && isEven(col)) || (!isEven(row) && !isEven(col))
                        ? "light-square"
                        : "dark-square";
                const color: string = (row==0||row==6)? "black": "white";
                if(row>=2 && row <=5){isOccupied = false;}
                else{
                    isOccupied=true;
                    if ((row==0 || row==7) && (col==0||col==7)){
                        currentPiece="rook";
                    }
                    else if ((row==0 || row==7) && (col==1||col==6)){
                        currentPiece="knight";
                    }
                    else if ((row==0 || row==7) && (col==2||col==5)){
                        currentPiece="bishop";
                    }
                    else if (row==1 || row==6){
                        currentPiece="pawn";
                    }
                    else if ((row==0 || row==7) && (col==3)){
                        currentPiece="queen";
                    }
                    else{
                        currentPiece="king";
                    }
                }
                squareRows.push(renderSquare(shadeSquare, isOccupied, color, currentPiece));
                console.log(squareRows,row,col,color)
            }
            board.push(<div className="board-row">{squareRows}</div>);
        }
        return board;
    }
    return <div>{setupBoard()}</div>;
    
}

export default ChessBoard;
