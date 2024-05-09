import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./Delivery.css";

let productos = [
  {
    nombre: "Salchicha",
    precio: "20",
    image:
      "https://cdn.pixabay.com/photo/2020/01/24/14/43/sausage-4790386_960_720.png",
  },
  {
    nombre: "Salsa",
    precio: "10",
    image: "https://www.pngmart.com/files/17/Red-Sauce-PNG-Photos.png",
  },
  {
    nombre: "Coca",
    precio: "2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Coca-Cola_bottle_cap.svg/2048px-Coca-Cola_bottle_cap.svg.png",
  },
];

function Delivery() {
  let cookie = new Cookies();
  useEffect(() => {
    cookie.set("valorPrueba", "popo");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [state, setState] = useState("NINGUN PRODUCTO SELECCIONADO");
  let [cookies] = useState(cookie.get("valorPrueba"));

  function mostrarProducto(e) {
    setState(e.target.value);
  }

  return (
    <div className="deliveryContainer">
      <button
        className="deliveryCartButton"
        onClick={() => {
          console.log("DISTE CLICK");
        }}
      >
        <img
          className="deliveryCartImg"
          src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
          alt="Carrito"
        />
      </button>
      <select
        onChange={(e) => {
          mostrarProducto(e);
        }}
        className="deliverySelect"
      >
        <option value="NINGUN PRODUCTO SELECCIONADO">
          Selecciona un Producto
        </option>
        {productos.map((producto, index) => (
          <option key={index} value={producto.nombre}>
            {`${producto.nombre}  $${producto.precio}`}
          </option>
        ))}
      </select>
      <img
        alt=""
        className="deliveryProductImg"
        src={
          productos.find((producto) => producto.nombre === state)?.image ||
          "https://via.placeholder.com/100"
        }
      />
      <p className="deliveryCookieText">{cookies}</p>
    </div>
  );
}

export default Delivery;