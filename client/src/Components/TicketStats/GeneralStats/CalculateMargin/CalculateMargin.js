import React, { useEffect, useState } from "react";
import "./CalculateMargin.css";

function CalculateMargin(props) {
  let invested = props.totalInvest;
  let [analytic, setAnalytic] = useState({
    relativeMargin: 10,
    absoluteMargin: 0,
  });

  useEffect(() => {
    setAnalytic({
      ...analytic,
      absoluteMargin: (Number(invested?.total) * analytic.relativeMargin) / 100,
    });
  }, [analytic.relativeMargin, invested?.total]);

  function handleRangeChange(e) {
    let selectedValue = e.target.value;
    setAnalytic({ ...analytic, relativeMargin: selectedValue });
  }

  return (
    <div className="calculateMarginContainer">
      <div className="totalInvestedAnalytic">
        {`Total Invertido: ${invested?.total}`}
      </div>
      <div className="marginValuesContainer">
        <div className="relativeMarginAnalytic">
          {`${props.operator}${analytic.relativeMargin}%`}
        </div>
        <div className="absoluteMarginAnalytic">
          {`(${Math.round(analytic.absoluteMargin)})`}
        </div>
      </div>
      <input
        type="range"
        id="marginRange"
        min="0"
        max="20"
        value={analytic.relativeMargin}
        onChange={(e) => handleRangeChange(e)}
        step="1"
        className="marginRangeInput"
      />
      <div className="appliedMarginQuantityContainer">
        {eval(
          `${invested?.total || 0} ${props.operator || "-"} ${Math.round(
            analytic.absoluteMargin
          )}`
        )}
      </div>
    </div>
  );
}

export default CalculateMargin;