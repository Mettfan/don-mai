import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../../../../features/analytics/analyticSlice";
import "./StatsMostSold.css";

function StatsMostSold(props) {
  let dispatch = useDispatch();
  let analytic = useSelector((state) => state?.analytics?.analytic);

  useEffect(() => {
    dispatch(getAnalytics({ analytic: props.analytic }));
  }, [dispatch, props.analytic]);

  let tickets = props?.tickets || [];
  let [mostSoldProducts, setMostSoldProducts] = useState([]);

  function sortProductsByQuantity(products) {
    let pairSold = products?.map((product) => {
      return [product["Producto"], product["quantity"]];
    });
    pairSold?.sort((a, b) => Number(b[1]) - Number(a[1]));
    return pairSold;
  }

  return (
    <>
      <div className="statsMostSoldContainer">
        <h3 className="statsTitle">{"Top " + props?.top}</h3>
        {sortProductsByQuantity(analytic.products)
          ?.map((product) => {
            return (
              <div key={product[0]} className="pairContainer">
                <div className="productTopName">{product[0]}</div>
                <div className="productTopQuantity">{product[1]}</div>
              </div>
            );
          })
          ?.slice(0, props?.top)}
      </div>
    </>
  );
}

export default StatsMostSold;