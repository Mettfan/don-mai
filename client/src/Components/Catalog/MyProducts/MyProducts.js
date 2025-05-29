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
import { addProductToCart } from "../../../features/products/productSlicetest";

function MyProducts(props) {
  const { selectedProducts, paramsId } = props;
  const isReadOnly = Boolean(paramsId);
  let cookie = new Cookies();
  let userProducts = useSelector((state) => state?.products?.userProducts);
  let dispatch = useDispatch();
  let user = cookie.get("user");

  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: paramsId ? paramsId : user.id }));
  };

  const [searchTerm, setSearchTerm] = useState("");

  const isSelected = (productId) => {
    return selectedProducts
      ? selectedProducts.some((product) => product.id === productId)
      : false;
  };

  useEffect(() => {
    if (user) {
      getUserProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  let deleteProduct = (productId, userId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  function selectProduct(id) {
    if (props.editMode && !isReadOnly) {
      dispatch(fetchOneProduct({ filter: "id", value: id }));
    }
  }

  const filteredProducts = userProducts
    ? userProducts.filter((product) => {
        const productName = product.Producto || "";
        const productCode = product.Código || "";

        return (
          productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          productCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <>
      <div className="myProductsContainer">
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="myProducts">
          {userProducts &&
            filteredProducts?.map((product) => {
              return (
                <div
                  key={product?.id}
                  onClick={() => {
                    if (!isReadOnly) {
                      selectProduct(product?.id);
                      props.handleProductSelection(product);
                    }
                  }}
                  className={`productBg ${
                    isSelected(product.id) ? "selectedProduct" : ""
                  }`}
                >
                  <div>{product?.Producto}</div>
                  <div>
                    {product?.["P. Venta"]?.toString().startsWith("$")
                      ? product["P. Venta"]
                      : `$${product["P. Venta"]}`}
                  </div>
                  <div>{product?.Código}</div>

                  {/* Solo mostrar la cantidad si no es solo lectura */}
                  {!isReadOnly && <div>{product?.quantity}</div>}

                  {!isReadOnly && (
                    <Link
                      params={product}
                      to={`/products/${product?.id}`}
                      className="productLink"
                    >
                      Detalles
                    </Link>
                  )}

                  {/* Solo mostrar botón de eliminar si no es solo lectura */}
                  {!isReadOnly && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product["id"], user?.id);
                      }}
                      className="deleteButton"
                    >
                      X
                    </button>
                  )}

                  {isReadOnly && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          addProductToCart({
                            userId: user.id,
                            product: product,
                          })
                        );
                      }}
                      className="addToCartButton"
                    >
                      Agregar al carrito
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {!isReadOnly && (
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
      )}
    </>
  );
}

export default MyProducts;