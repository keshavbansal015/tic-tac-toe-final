import React from "react";
import "./Square.css"; // Assuming you have a separate CSS file for Square

const Square = ({ value, onClick }) => {
  // Determine the class for the square based on its value
  const squareClass = value ? `square ${value}` : "square";

  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
