import React, { useEffect, useState } from "react";
import "./Catalog.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
  editOneProduct,
  fetchAllProducts as fetchProducts,
  getMyProducts,
  postProduct,
  setCounter,
} from "../../features/products/productSlicetest";
import productPlaceholder from "../../Assets/productPlaceholder.png";
import { checkIfProductIsUpdated } from "../UpdatePrice/UpdatePrice/updateTools";
import { useNavigate } from "react-router-dom";
import MyProducts from "./MyProducts/MyProducts";
import { downloadExcel } from "../Convert/Convert";
import Modal from "react-modal";

export default function Catalog(props) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cookie = new Cookies();
  const user = cookie.get("user")
  const userId = user?.id;

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleActionSelection = (action) => {
    setSelectedAction(action);
  };

  const executeAction = () => {
    if (selectedAction === "updatePrice") {
      setIsLoading(true); // Inicia la carga
      updateSelectedProductsPrice();
    } else if (selectedAction === "addToPrice") {
      setIsLoading(true); // Inicia la carga
      addToSelectedProductsPrice();
    }
    setSelectedAction(null);
  };

  const updateSelectedProductsPrice = () => {
    selectedProducts.forEach((product) => {
      dispatch(
        editOneProduct({
          id: product.id,
          findBy: "P. Venta",
          infoUpdated: `$${newPrice}`,
          userId: userId
        })
      ).then(() => {
        setIsLoading(false); // Termina la carga
        setNewPrice("");
        window.location.reload(); // Recarga la página
      });
    });
  };

  const addToSelectedProductsPrice = () => {
    selectedProducts.forEach((product) => {
      let currentPrice = parseFloat(product["P. Venta"].replace("$", ""));
      let quantity = parseFloat(quantityToAdd);

      if (!isNaN(currentPrice) && !isNaN(quantity)) {
        const newprice = currentPrice + quantity;
        console.log(newprice);
        dispatch(
          editOneProduct({
            id: product.id,
            findBy: "P. Venta",
            infoUpdated: `$${newprice}`,
            userId: userId
          })
        ).then(() => {
          setIsLoading(false); // Termina la carga
          setQuantityToAdd("");
          window.location.reload(); // Recarga la página
        });
      }
    });
  };

  const handleProductSelection = (product) => {
    const index = selectedProducts.findIndex((p) => p.id === product.id);

    if (index === -1) {
      const newSelectedProducts = [...selectedProducts, product];
      setSelectedProducts(newSelectedProducts);
    } else {
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(index, 1);
      setSelectedProducts(updatedProducts);
    }
  };

  useEffect(() => {
    if (user) {
      getUserProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let nav = useNavigate();
  let todaysDate = new Date();
  let editMode = props.editmode;
  const productState = useSelector((state) => state);
  const productList = productState.products.products;
  const [filteredProducts, setFilteredProducts] = useState(productList);

  // useEffect(() => {
  //   if (!productList.length) {
  //     getAllProducts();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setFilteredProducts(productList);
  }, [productList]); // Esta línea asegura que filteredProducts se actualice cuando productList cambie

  let dispatch = useDispatch();
  let userProducts = useSelector((state) => state.products?.userProducts);

  function downloadFile() {
    downloadExcel(userProducts);
  }

  function getAllProducts() {
    dispatch(fetchProducts());
  }

  let createProduct = async (product, userId) => {
    product = {
      Código: product["Código"] || null,
      Producto: product["Producto"] || null,
      "P. Venta": product["P. Venta"] || null,
      "P. Compra": product["P. Compra"] || null,
      Departamento: product["Departamento"] || null,
      image: product["image"] || null,
      brand: product["brand"] || null,
    };

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
  };

  let addProduct = async (product, userId) => {
    createProduct(product, userId);
  };

  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

  const selectAllProducts = () => {
    if (!selectedProducts.length > 0) {
      setSelectedProducts(productList);
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <>
      <div className="catalogPage">
        {!user && (
          <div>
            not registered
            <div>
              Registrate y mira nuestros {productList?.length} productos
              existentes
            </div>
          </div>
        )}
        {user?.privileges === "usuario" && <div>usuario mode</div>}
        <div className="container">
          {user?.privileges === "admin" && Number(user?.kyu) >= 9 && (
            <div>
              admin mode
              <button onClick={() => downloadFile()} className="catalogButton">
                DOWNLOAD EXCEL
              </button>
              <button
                onClick={() => getAllProducts()}
                className="catalogButton"
              >
                GET ALL PRODUCTS
              </button>
            </div>
          )}
          <button onClick={() => nav("/onlist")} className="verFaltante">
            VER FALTANTE
          </button>

          {userProducts.length > 0 && (
            <button
              onClick={() => nav("/complete/product/info")}
              className="completeInfo"
            >
              COMPLETE PRODUCT INFO
            </button>
          )}

          {selectedProducts.length > 0 && (
            <button onClick={handleEditProduct} className="editarProductos">
              Editar Productos Seleccionados
            </button>
          )}

          <button onClick={selectAllProducts} className="seleccionarTodos">
            {selectedProducts.length > 0
              ? "Deseleccionar Todos"
              : "Seleccionar Todos"}
          </button>
        </div>
        {filteredProducts.length !== 0 ? (
          <MyProducts
            selectedProducts={selectedProducts}
            editMode={editMode}
            handleProductSelection={handleProductSelection}
          />
        ) : (
          <button onClick={() => nav("/upload/product")}>
            Create One Product
          </button>
        )}
        <div>
          {isEditing && (
            <Modal isOpen={true}>
              <div className="modal-estilo">
                {isLoading && <h1 className="loading-message">Cargando...</h1>}
                <button
                  onClick={() => handleActionSelection("updatePrice")}
                  className="boton-accion"
                >
                  Modificar Valor
                </button>
                <button
                  onClick={() => handleActionSelection("addToPrice")}
                  className="boton-accion"
                >
                  Sumar/Restar Cantidad
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="boton-cerrar"
                >
                  X
                </button>

                {selectedAction && (
                  <div className="contenedor-acciones">
                    {selectedAction === "updatePrice" && (
                      <div className="actualizar-precio">
                        <label>
                          Nuevo Precio:
                          <input
                            type="number"
                            min={0}
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="input-precio"
                          />
                        </label>
                        <button
                          onClick={executeAction}
                          className="boton-actualizar"
                        >
                          Actualizar Precio
                        </button>
                      </div>
                    )}

                    {selectedAction === "addToPrice" && (
                      <div className="sumar-cantidad">
                        <label>
                          Cantidad a Sumar o Restar:
                          <input
                            type="number"
                            value={quantityToAdd}
                            onChange={(e) => setQuantityToAdd(e.target.value)}
                            className="input-cantidad"
                          />
                        </label>
                        <button onClick={executeAction} className="boton-sumar">
                          {quantityToAdd > 0 ? "Sumar" : "Restar"} Cantidad
                        </button>
                      </div>
                    )}

                    <div className="productos-a-modificar">
                      <h3>Productos que van a ser modificados:</h3>
                      <ul>
                        {selectedProducts.map((product, index) => (
                          <li key={index}>
                            {product.Código} - {product["P. Venta"]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
        {user?.privileges === "admin" &&
          productList?.slice(0, props?.items || 20)?.map((product) => {
            return (
              <div className="catalogCard" key={product.id}>
                <span className="productBg">
                  <img
                    alt=""
                    className="productImage"
                    src={product.image || productPlaceholder}
                  />
                  <div className="productInfoContainer">
                    <button
                      onClick={() => addProduct(product, user.id)}
                      className="catalogButton"
                    >
                      ADD
                    </button>
                    <div
                      onClick={() => {
                        nav("/products/" + product.id);
                      }}
                    >
                      {product.Producto}
                    </div>
                    <div>{product["P. Venta"]}</div>
                    {editMode && <div>{product.id}</div>}
                    {editMode && (
                      <div>
                        {checkIfProductIsUpdated(
                          Number(
                            product["updatedAt"]?.split("T")[0]?.split("-")[1]
                          ),
                          Number(
                            product["updatedAt"]?.split("T")[0]?.split("-")[2]
                          ),
                          todaysDate.getMonth() + 1,
                          todaysDate.getDate(),
                          "onlyNumbers"
                        )}
                      </div>
                    )}
                    {editMode && (
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => dispatch(setCounter(product["Código"]))}
                      >
                        Edit
                      </div>
                    )}
                  </div>
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
}