import React from "react";
import "../../assets/css/board.css";

export interface PieceInfo {
    isOccupied: boolean;
    pieceURL: string;
    type: string;
    color: string;
}

interface Props {
    shade: string;
    pieceInfo: PieceInfo;
}

const Square: React.FC<Props> = (props: Props) => {
    return (
        <button className={"square " + props.shade}>
            <img src={props.pieceInfo.pieceURL}/>
        </button>
    );
};

export default Square;
