import React from "react";
import "../../assets/css/board.css";

interface Props {
  shade: string;
}

const Square: React.FC<Props> = ({ shade }) => {
  return (
    <button
      className={"square " + shade}
      /*onClick={props.onClick}
      style={props.style}*/
    ></button>
  );
};
export default Square;
