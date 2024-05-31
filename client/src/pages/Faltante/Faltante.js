import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  getMyProducts,
} from "../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Faltante.css";

function Faltante() {
  let dispatch = useDispatch();
  let nav = useNavigate();
  let userProducts = useSelector((state) => state.products.userProducts);
  let cookie = new Cookies();
  let user = cookie.get("user");

  useEffect(() => {
    if (user) {
      getUserProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [state, setState] = useState({
    ls: 20,
    li: 0,
    currentDepartment: null,
  });

  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

  function productSelector(li, ls) {
    return userProducts
      ?.filter((product) => product.quantity >= li && product.quantity <= ls)
      ?.sort((a, b) => (a?.Producto ?? "").localeCompare(b?.Producto ?? ""));
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRangeChange(e) {
    let selectedValue = e.target.value;
    setState({ ...state, [e.target.name]: selectedValue });
  }

  function filterBy(key, value, list) {
    return list?.filter((element) => element[key] === value);
  }

  function departmentCounter(products) {
    let departmentList = new Set();
    products?.forEach((product) => {
      departmentList.add(product["Departamento"]);
    });
    return Array.from(departmentList)?.sort();
  }

  function handleDepartmentOnChange(e) {
    setState({
      ...state,
      currentDepartment: e.target.value === "TODOS" ? null : e.target.value,
    });
  }

  function productCard(product) {
    return (
      <div className="faltanteInfoContainer" key={product.id}>
        <div
          className="faltanteName"
          onClick={() => {
            nav("/products/" + product.id);
          }}
        >
          {product?.Producto?.slice(0, 10)}
        </div>
        <div>{product["P. Venta"]}</div>
        <div className="faltanteQuantity">{product["quantity"]}</div>
      </div>
    );
  }

  return (
    <>
      <header>Producto Faltante</header>
      <div className="filterSection">
        <div className="filterGroup">
          <h3>Limite Superior</h3>
          <input
            value={state.ls}
            type="range"
            name="ls"
            id="marginRangeLS"
            min="0"
            max="20"
            onChange={handleRangeChange}
            step="1"
          />
          <div>{state.ls}</div>
        </div>
        <div className="filterGroup">
          <h3>Limite Inferior</h3>
          <input
            value={state.li}
            type="range"
            name="li"
            id="marginRangeLI"
            min="0"
            max="20"
            onChange={handleRangeChange}
            step="1"
          />
          <div>{state.li}</div>
        </div>
        <div className="filterGroup">
          <h3>Departamento</h3>
          <select
            onChange={handleDepartmentOnChange}
            name="departments"
            id="deps"
          >
            <option value="TODOS">TODOS</option>
            {departmentCounter(userProducts)?.map((departamento) => {
              return (
                <option value={departamento} key={departamento}>
                  {departamento}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="faltanteContainer">
        {(state.currentDepartment
          ? filterBy(
              "Departamento",
              state.currentDepartment,
              productSelector(state.li, state.ls)
            )
          : productSelector(state.li, state.ls)
        )?.map((product) => {
          return (
            <div className="faltanteProductContainer" key={product.id}>
              {productCard(product)}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Faltante;