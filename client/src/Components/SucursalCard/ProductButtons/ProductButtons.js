import React from "react";
import { useDispatch } from "react-redux";
import {
  exhibirProducto,
  fetchOneSucursal,
  quitarExhibicion,
} from "../../../features/sucursal/sucursalSlice";
import "./ProductButtons.css";

function ProductButtons({ product, sucursalId, button }) {
  let dispatch = useDispatch();

  async function exhibitProduct() {
    console.log("Should Exhibit PRODUCT: " + product?.Código);
    console.log("Should Exhibit SucursalId: " + sucursalId);
    let promise = new Promise((resolve, reject) => {
      dispatch(
        exhibirProducto({ sucursalId: sucursalId, productId: product?.id })
      );
      resolve("Exhibido");
    });
    await promise.then((result) => {
      console.log(result);
      dispatch(fetchOneSucursal({ filter: "id", value: sucursalId }));
    });
  }

  async function notexhibitProduct() {
    console.log("Should unExhibit PRODUCT: " + product?.Código);
    console.log("Should unExhibit SucursalId: " + sucursalId);
    let promise = new Promise((resolve, reject) => {
      dispatch(
        quitarExhibicion({ sucursalId: sucursalId, productId: product?.id })
      );
      resolve("desExhibido");
    });
    await promise.then((result) => {
      console.log(result);
      dispatch(fetchOneSucursal({ filter: "id", value: sucursalId }));
    });
  }

  return (
    <div className="PrivateProductButtons">
      {button === "exhibir" && (
        <button onClick={() => exhibitProduct()}>Exhibir</button>
      )}
      {button === "desexhibir" && (
        <button onClick={() => notexhibitProduct()}>Desexhibir</button>
      )}
    </div>
  );
}

export default ProductButtons;