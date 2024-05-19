import React from "react";
import Convert from "../../Components/Convert/Convert";
import CreateProduct from "../../Components/CreateProduct/CreateProduct";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UploadProduct.css";

function UploadProduct() {
  let cookie = new Cookies();
  let user = useSelector((state) => state.user) || cookie.get("user");
  let nav = useNavigate();

  return (
    <>
      {user?.privileges ? (
        <div className="uploadProductContainer">
          
          <div className="toolWrapper">
            <CreateProduct />
            <h1 className="uploadTitle">Subir Producto</h1>
            <Convert />
          </div>
        </div>
      ) : (
        <div className="registerPromptContainer">
          <h1 onClick={() => nav("/register")} className="registerPrompt">
            Regístrate
          </h1>
        </div>
      )}
    </>
  );
}

export default UploadProduct;