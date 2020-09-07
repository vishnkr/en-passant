class Piece {
  player: string;
  pieceStyle: string;
  isPlayingWhite: boolean;

  constructor(player: string, pieceL: string, playerColor: string) {
    this.player = player;
    this.pieceStyle = "";
    this.isPlayingWhite = playerColor == "white";
  }
}

export default Piece;
