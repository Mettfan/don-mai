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
  let userProducts = useSelector((state) => state.products.userProducts);
  let nav = useNavigate();

  const getProductLimit = (privileges) => {
    switch (privileges) {
      case "Plan Premium":
      case "premium":
        return 1000;
      case "basic":
        return 100;
      case "usuario":
        return 7;
      default:
        return 0;
    }
  };

  const productLimit = getProductLimit(user?.privileges);
  const canCreateProduct = userProducts && userProducts.length < productLimit;

  return (
    <>
      {user?.privileges ? (
        <div className="uploadProductContainer">
          <div className="toolWrapper">
            {canCreateProduct ? (
              <>
                <CreateProduct />
                <h1 className="uploadTitle">Subir Producto</h1>
                <Convert />
              </>
            ) : (
              <h1 className="uploadTitle">
                Has alcanzado el límite de productos para tu plan
              </h1>
            )}
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