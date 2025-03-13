import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Income from "./Income/Income";
import Outcome from "./Outcome/Outcome";
import StatsMostSold from "./StatsMostSold/StatsMostSold";
import "./GeneralStats.css";
import CalculateMargin from "./CalculateMargin/CalculateMargin";
import { getTotalInvested } from "../../../features/products/productSlicetest";

function GeneralStats() {
  let dispatch = useDispatch();
  let tickets = useSelector((state) => state.products.tickets.response);
  let totalInvest = useSelector((state) => state.products.totalInvest);
  let [typeTicket, setTypeTicket] = useState("mostBought");
  let [investType, setInvestType] = useState("Venta");
  let [operator, setOperator] = useState("-");

  function switchTypeTicket() {
    setTypeTicket(typeTicket === "mostBought" ? "mostSold" : "mostBought");
  }

  function switchInvestType() {
    setInvestType(investType === "Venta" ? "Compra" : "Venta");
    setOperator(operator === "-" ? "+" : "-");
  }

  useEffect(() => {
    dispatch(getTotalInvested(investType));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investType]);

  let [top, setTop] = useState(10);

  function handleTopOnChange(e) {
    setTop(e.target.value || 10);
  }

  return (
    <>
      <div className="generalStatsContainer">
        <div className="switchButtonContainer">
          <button className="switchButton" onClick={() => switchTypeTicket()}>
            SWITCH
          </button>
          <input
            className="topInput"
            placeholder="Ingrese Top"
            type={"number"}
            onChange={(e) => handleTopOnChange(e)}
          />
        </div>
        <StatsMostSold analytic={typeTicket} top={top} tickets={tickets} />
        <div className="generalStatsIncomeandOutcome">
          <Income />
          <Outcome />
        </div>
        <button className="investTypeButton" onClick={() => switchInvestType()}>
          {investType}
        </button>
        <CalculateMargin totalInvest={totalInvest} operator={operator} />
        {operator}
      </div>
    </>
  );
}

export default GeneralStats;