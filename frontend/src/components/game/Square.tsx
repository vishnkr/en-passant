import React from "react";
import "./board.css";

export interface PieceInfo {
    isOccupied?: boolean;
    pieceURL: string | any;
    type: string | undefined;
    color: string;
}

interface Props {
    shade: string;
    pieceInfo?: PieceInfo;
}

const Square: React.FC<Props> = (props: Props) => {
    return (
        <>
            <button draggable="true" className={"square " + props.shade}>
                <img draggable="true" src={props.pieceInfo? props.pieceInfo.pieceURL: null}/>
            </button>
        </>
    );
};

export default Square;
