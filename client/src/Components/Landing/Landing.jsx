import React from "react";
import Carrousel from "./Carrousel/Carrousel";
import LOGODONMAY from "../../Assets/LOGODONMAY.png";
import RECIBO from "../../Assets/RECIBO.png";
import CALCULATOR from "../../Assets/calculator.png";
import BOXES from "../../Assets/boxes.png";
import BARCODE from "../../Assets/barcode.png";
import CATALOGO from "../../Assets/catalogo.png";
import GRAPH from "../../Assets/graph.png";
import USER from "../../Assets/user.png";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  let nav = useNavigate();

  // Lista de herramientas
  let tools = [
    {
      img: RECIBO,
      title: "Tickets",
      goto: "/recibo",
    },
    {
      img: CATALOGO,
      title: "Catálogo Personal",
      goto: "/catalog",
    },

    {
      img: CALCULATOR,
      title: "Cuentas Rápidas",
      goto: "/calculator",
    },
    {
      img: BOXES,
      title: "Control de Inventario",
      goto: "/boxes",
    },
    {
      img: BARCODE,
      title: "Control de Productos",
      goto: "/barcode",
    },
  ];

  let comingTools = [
    {
      img: GRAPH,
      title: "Análisis",
      goto: "/analisis",
    },
  ];

  let logs = [
    {
      img: USER,
      title: "Registrate",
      goto: "/register",
    },
    {
      img: LOGODONMAY,
      title: "Inicia Sesión",
      goto: "/login",
    },
  ];

  return (
    <div className="landingPage">
      <div className="logsContainer">
        {logs.map((log, index) => (
          <div
            key={index}
            onClick={() => {
              nav(log.goto);
            }}
            className="toolContainer"
          >
            <img className="icon" src={log.img} alt={log.title} />
            <h3>{log.title}</h3>
          </div>
        ))}
      </div>

      <div className="Carrousel-container">
        <h2 className="Carrousel-title">
          Usa las Herramientas que ofrece el sistema DM
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
            bottom: "50px",
            flexWrap: "wrap",
            marginTop: "70px",
          }}
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => {
                nav(tool.goto);
              }}
              className="toolContainer"
            >
              <h3>{tool.title}</h3>
              <img className="icon" src={tool.img} alt={tool.title} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Carrousel text="PRÓXIMAMENTE..." />
        {comingTools.map((tool, index) => (
          <div
            key={index}
            onClick={() => {
              nav(tool.goto);
            }}
            className="toolContainer"
          >
            <img className="icon" src={tool.img} alt={tool.title} />
            <h3>{tool.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
