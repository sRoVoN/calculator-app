import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import {
  handleClickButton,
  equalsClick,
  invertClick,
  signClick,
  percentClick,
  comaClick,
  resetClick,
} from "../lib/calculatorFunctions";

const getStyleName = (value) => {
  const className = {
    "=": "equals",
    X: "opt",
    "+": "opt",
    "-": "opt",
    "/": "opt",
    0: "zero",
    C: "keys",
    "%": "keys",
    "+-": "keys",
  };
  return className[value] || "button";
};

function Button({ value, activeOperator, setActiveOperator }) {
  const { calc, setCalc } = useContext(CalcContext);

  const handleClick = (value) => {
    const results = {
      ".": () => comaClick(setCalc, calc),
      "C": () => resetClick(setCalc),
      "+": () => signClick(calc, setActiveOperator, setCalc, value),
      "-": () => signClick(calc, setActiveOperator, setCalc, value),
      "X": () => signClick(calc, setActiveOperator, setCalc, value),
      "/": () => signClick(calc, setActiveOperator, setCalc, value),
      "=": () => equalsClick(calc, setCalc, setActiveOperator),
      "%": () => percentClick(setCalc, calc),
      "+-": () => invertClick(setCalc, calc),
    };

    const action = results[value];
    if (action) {
      return action();
    } else {
      return handleClickButton(value, setCalc, calc);
    }
  };

  return (
    <button
      className={`${getStyleName(value)} button ${
        activeOperator === value ? "active-btn" : ""
      } `}
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;
