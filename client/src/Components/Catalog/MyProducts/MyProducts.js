import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneProduct,
  getMyProducts,
  removeProduct,
} from "../../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import "./MyProducts.css";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

function MyProducts(props) {
  let cookie = new Cookies();
  let userProducts = useSelector((state) => state?.products?.userProducts);
  let dispatch = useDispatch();
  let user = cookie.get("user");
  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

  const { selectedProducts } = props;
  const isSelected = (productId) => {
    return selectedProducts
      ? selectedProducts.some((product) => product.id === productId)
      : false;
  };
  useEffect(() => {
    if (user) {
      getUserProducts();
    }
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  let deleteProduct = (productId, userId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  function selectProduct(id) {
    if (props.editMode) {
      dispatch(fetchOneProduct({ filter: "id", value: id }));
    }
  }

  return (
    <>
      <div>
        <div className="myProducts">
          {userProducts &&
            userProducts?.map((product) => {
              return (
                <div
                  key={product?.id}
                  onClick={() => {
                    selectProduct(product?.id);
                    props.handleProductSelection(product);
                  }}
                  className={`productBg ${
                    isSelected(product.id) ? "selectedProduct" : ""
                  }`}
                >
                  <div>{product?.Producto}</div>
                  <div>{product?.["P. Venta"]}</div>
                  <div>{product?.Código}</div>
                  <div>{product?.quantity}</div>
                  <Link params={product} to={`/products/${product?.id}`}>
                    Detalles
                  </Link>
                  <button
                    onClick={() => deleteProduct(product["id"], user?.id)}
                    className="deleteButton"
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          dispatch(
            removeProduct({ userId: user.id, productId: selectedProductId })
          ).then(() => {
            getUserProducts();
          });
          setModalOpen(false);
        }}
        question="¿Estás seguro de que deseas eliminar este producto?"
      />
    </>
  );
}

export default MyProducts;
