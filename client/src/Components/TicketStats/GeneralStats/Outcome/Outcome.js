import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOutcome } from "../../../../features/analytics/analyticSlice";
import "./Outcome.css";

function Outcome() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOutcome());
  }, [dispatch]);

  let outcome = useSelector((state) => state?.analytics?.outcome);

  return (
    <>
      <div className="outcomeContainer">
        <span className="outcomeLabel">Outcome:</span>
        <span className="outcomeValue">{JSON.stringify(outcome.outcome)}</span>
      </div>
    </>
  );
}

export default Outcome;