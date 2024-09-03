import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToStock,
  counterDecrement,
  counterIncrement,
  editOneProduct,
  fetchAllProducts,
  fetchOneProduct,
  setCounter,
} from "../../../features/products/productSlicetest";
import "./UpdatePrice.css";
import Catalog from "../../Catalog/Catalog";
import { checkIfProductIsUpdated } from "./updateTools";
import TotalInvest from "../../TotalInvest/TotalInvest";
import Cookies from "universal-cookie";

export default function UpdatePrice() {
  let todaysDate = new Date();
  let cookie = new Cookies();
  let user = cookie.get("user");
  let [state, setState] = useState({
    idInput: null,
    nameInput: null,
    priceInput: null,
    Producto: "",
    id: null,
    "P. Venta": null,
    "P. Compra": null,
    lastDayUpdated: "",
    lastMonthUpdated: "",
    lastYearUpdated: "",
    pieces: null,
  });
  let idInput = state.idInput;
  let dispatch = useDispatch();
  let selectedProduct = useSelector((state) => state.products.selectedProduct);
  let counterId = useSelector((state) => state.products.counterId);

  useEffect(() => {
    getProduct(counterId);
    document.getElementById("id").focus();
    document.getElementById("price").value = null;
    document.getElementById("departament").value = null;
    document.getElementById("id").value = null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterId]);

  useEffect(() => {
    if (selectedProduct?.id) {
      document.getElementById("price").focus();
    }
    setState({
      ...state,
      lastDayUpdated: Number(
        selectedProduct["updatedAt"]?.split("T")[0]?.split("-")[2]
      ),
      lastMonthUpdated: Number(
        selectedProduct["updatedAt"]?.split("T")[0]?.split("-")[1]
      ),
      lastYearUpdated: Number(
        selectedProduct["updatedAt"]?.split("T")[0]?.split("-")[0]
      ),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  function getProduct(barcode) {
    dispatch(
      fetchOneProduct({ filter: "Código", value: barcode, userId: user?.id })
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault && e.preventDefault();
    getProduct(idInput);
    dispatch(setCounter(Number(idInput)));
  }

  function handleInputOnChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function incrementCounter() {
    dispatch(counterIncrement());
  }

  function decrementCounter() {
    dispatch(counterDecrement());
  }

  function handleOnEdit(e, findBy) {
    e.preventDefault && e.preventDefault();
    dispatch(
      editOneProduct({
        id: selectedProduct.id,
        findBy: e.target.name,
        infoUpdated: state[e.target.name],
      })
    ).then(() => {
      getProduct(selectedProduct["Código"]);
      getAllProducts();
    });
  }

  function reUpdatePrice() {
    dispatch(
      editOneProduct({
        id: selectedProduct.id,
        findBy: "P. Venta",
        infoUpdated: selectedProduct["P. Venta"],
      })
    )
      .then(() => {
        getProduct(selectedProduct["Código"]);
        getAllProducts();
      })
      .then(() => {
        window.location.reload();
      });
  }

  function getAllProducts() {
    dispatch(fetchAllProducts());
  }

  function handleKeyPress(e) {
    let keyCode = e.keyCode;
    if (keyCode === 37) {
      decrementCounter();
    }
    if (keyCode === 39) {
      incrementCounter();
    }
  }

  function addStock(e) {
    e?.preventDefault && e.preventDefault();
    dispatch(
      addProductToStock({
        productBarcode: selectedProduct["Código"],
        quantity: state.pieces,
        id: selectedProduct["id"],
      })
    ).then(() => {
      getProduct(selectedProduct["Código"]);
      getAllProducts();
    });
  }

  return (
    <div className="editProductContainer">
      <div className="editContainer">
        <form
          onSubmit={(e) => handleOnSubmit(e)}
          className="inputFormEdit"
          autoComplete="off"
        >
          <input
            id="id"
            name="idInput"
            type="text"
            placeholder={selectedProduct.id}
            onChange={(e) => handleInputOnChange(e)}
          />
        </form>
        <div>
          {selectedProduct && (
            <div>
              <div>{"Producto: " + selectedProduct.Producto}</div>
              <div>
                {"Precio: " + selectedProduct["P. Venta"]}
                <form
                  name="P. Venta"
                  onSubmit={(e) => handleOnEdit(e, "P. Venta")}
                  className="inputFormEdit"
                >
                  <input
                    id="price"
                    placeholder="Nuevo Precio"
                    name="P. Venta"
                    type="number"
                    onChange={(e) => handleInputOnChange(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    autoFocus="autofocus"
                  />
                  <button type="submit" className="buttonSubmit">
                    Actualizar
                  </button>
                </form>
              </div>
              <div>
                {"Departamento: " + selectedProduct["Departamento"]}
                <form
                  name="Departamento"
                  onSubmit={(e) => handleOnEdit(e, "Departamento")}
                  className="inputFormEdit"
                >
                  <input
                    id="departament"
                    placeholder="Nuevo Departamento"
                    name="Departamento"
                    type="text"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  <button type="submit" className="buttonSubmit">
                    Actualizar
                  </button>
                </form>
              </div>
              <div>
                {"Cantidad: " + selectedProduct["quantity"]}
                <form
                  name="quantity"
                  onSubmit={(e) => handleOnEdit(e, "quantity")}
                  className="inputFormEdit"
                >
                  <input
                    id="quantity"
                    placeholder="Editar Inventario"
                    name="quantity"
                    type="number"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  <button type="submit" className="buttonSubmit">
                    Actualizar
                  </button>
                </form>
                <form
                  name="pieces"
                  onSubmit={(e) => addStock(e)}
                  className="inputFormEdit"
                >
                  <input
                    id="pieces"
                    placeholder="Agregar Piezas a Inventario"
                    name="pieces"
                    type="number"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  <button type="submit" className="buttonSubmit">
                    Añadir al Inventario
                  </button>
                </form>
              </div>
              <div>
                {checkIfProductIsUpdated(
                  state.lastMonthUpdated,
                  state.lastDayUpdated,
                  todaysDate.getMonth() + 1,
                  todaysDate.getDate()
                )}
              </div>
              <button onClick={() => reUpdatePrice()} className="buttonSubmit">
                Reupdate
              </button>
            </div>
          )}
        </div>
        <Catalog items={12} editmode={true} filter={""} value={""}></Catalog>
      </div>
      {user?.privileges === "admin" && <TotalInvest></TotalInvest>}
    </div>
  );
}