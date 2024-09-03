import React, { useEffect } from "react";
import Convert from "../../Components/Convert/Convert";
import CreateProduct from "../../Components/CreateProduct/CreateProduct";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts as fetchProducts } from "../../features/products/productSlicetest";
import { getMyProducts } from "../../features/products/productSlicetest";
import "./UploadProduct.css";

function UploadProduct() {
  let dispatch = useDispatch();
  let cookie = new Cookies();
  let user = useSelector((state) => state.user) || cookie.get("user");
  let userProducts = useSelector((state) => state.products.userProducts);
  let nav = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getUserProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Solo realiza la verificación cuando los productos estén cargados
  const productLimit = user?.bought || 0;
  const canCreateProduct = userProducts && userProducts.length < productLimit;

  console.log(user, "!!!", userProducts);

  return (
    <>
      {user ? (
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
                Has alcanzado el límite de productos que puedes crear
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