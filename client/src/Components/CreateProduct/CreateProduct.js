import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getMyProducts,
  postProduct,
} from "../../features/products/productSlicetest";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./CreateProduct.css";

function CreateProduct() {
  let cookie = new Cookies();
  let user = cookie.get("user");
  let nav = useNavigate();
  let [state, setState] = useState({
    product: {
      Producto: "",
      Código: "",
      "P. Venta": "",
      Departamento: "",
    },
  });
  let [isFormValid, setIsFormValid] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    const {
      Producto,
      Código,
      "P. Venta": PVenta,
      Departamento,
    } = state.product;
    setIsFormValid(Producto && Código && PVenta && Departamento);
  }, [state]);

  const handleInputChange = (e) => {
    setState({
      ...state,
      product: {
        ...state.product,
        [e.target.name]: e.target.value,
      },
    });
  };

  const createProduct = async (product, userId) => {
    let promise = new Promise((resolve, reject) => {
      dispatch(
        postProduct({ products: [{ ...product }], userId: userId })
      ).then(() => {
        resolve("OKCREATED");
      });
    });

    await promise
      .then((result) => {
        dispatch(getMyProducts({ userId: userId }));
      })
      .then(() => {
        nav("/catalog");
      });
      // alert("Creado")
      // window.location.reload()
  };

  return (
    <div className="createProductContainer">
      <h2>Crear Producto</h2>
      <input
        placeholder="Producto"
        name={"Producto"}
        type={"text"}
        onChange={(e) => {
          handleInputChange(e);
        }}
        className="createInput"
      />
      <input
        placeholder="Código"
        name={"Código"}
        type={"text"}
        onChange={(e) => {
          handleInputChange(e);
        }}
        className="createInput"
      />
      <input
        placeholder="P.Venta"
        name={"P. Venta"}
        type={"number"}
        onChange={(e) => {
          handleInputChange(e);
        }}
        className="createInput"
      />
      <input
        placeholder="Departamento"
        name={"Departamento"}
        type={"text"}
        onChange={(e) => {
          handleInputChange(e);
        }}
        className="createInput"
      />
      {!isFormValid && <p className="pError">Completa el formulario para poder crear el producto</p>}
      <button
        onClick={() => {
          createProduct(state.product, user.id);
        }}
        className={`createButton ${!isFormValid && "createButtonDisabled"}`}
        disabled={!isFormValid}
      >
        CREAR
      </button>
    </div>
  );
}

export default CreateProduct;