import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Calculator.css";

export default function Calculator() {
  let [state, setState] = useState({
    toPay: 0,
    payed: 0,
    change: 0,
  });

  function handleOnChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleEnterFocus(e) {
    if (e.keyCode === 13) {
      if (e.target.name === "payed") {
        document.getElementById("toPay").focus();
      }
      if (e.target.name === "toPay") {
        document.getElementById("payed").focus();
      }
    }
  }

  return (
    <Draggable>
      <div className="calculatorContainer">
        <div className="calculatorTitle">Change Calculator</div>
        <div>
          <input
            id="toPay"
            name="toPay"
            onChange={(e) => handleOnChange(e)}
            placeholder="A pagar"
            onKeyDown={(e) => handleEnterFocus(e)}
          />
        </div>
        <div>
          <input
            id="payed"
            name="payed"
            onChange={(e) => handleOnChange(e)}
            placeholder="Pagado"
            onKeyDown={(e) => handleEnterFocus(e)}
          />
        </div>
        <div className="calculatorResult">
          {(Number(state.toPay - state.payed) < 0 ? "Cambio: " : "Faltan: ") +
            (state.toPay - state.payed)}
        </div>
      </div>
    </Draggable>
  );
}