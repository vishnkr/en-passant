import "../../assets/pieces";

interface Positions {
    positions: number[];
}

class Piece {
    player: string;
    pieceStyle: string;
    isPlayingWhite: boolean;

    constructor(playerInfo: {
        player: string;
        pieceStyle: string;
        playerColor: string;
    }) {
        this.player = playerInfo.player;
        this.pieceStyle = "";
        this.isPlayingWhite = playerInfo.playerColor == "white";
    }
}

class Pawn extends Piece {
    //startingPositions: Positions;

    constructor(playerInfo: {
        player: string;
        pieceStyle: string;
        playerColor: string;
    }) {
        super(playerInfo);
    }
}

class King extends Piece {
}

class Queen extends Piece {
}

class Knight extends Piece {
}

class Rook extends Piece {
}

class Bishop extends Piece {
}

export default {King, Queen, Bishop, Knight, Rook, Pawn};
