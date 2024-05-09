import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../../../../features/analytics/analyticSlice";
import "./Income.css";

function Income() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);

  let income = useSelector((state) => state?.analytics?.income);

  return (
    <>
      <div className="incomeContainer">
        <span className="incomeLabel">Income:</span>
        <span className="incomeValue">{JSON.stringify(income.income)}</span>
      </div>
    </>
  );
}

export default Income;