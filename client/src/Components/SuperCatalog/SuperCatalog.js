import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import {
  getMyProducts,
  editOneProduct,
} from "../../features/products/productSlicetest"; // Asegúrate de importar correctamente las acciones necesarias
import productPlaceholder from "../../Assets/productPlaceholder.png";
import { useNavigate, useParams } from "react-router-dom";
import "../Catalog/Catalog.css";
import Modal from "react-modal";

function SuperCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const cookie = new Cookies();
  const nav = useNavigate();
  const { id: userId } = useParams();
  const user = cookie.get("user");

  //SI NO SOS ADMIN TE MUESTRA TUS PRODUCTOS!!
  const isAdmin = user?.privileges !== "admin";

  useEffect(() => {
    console.log(isAdmin, userId);
    if (isAdmin && userId) {
      fetchProducts(userId);
    } else if (user) {
      fetchProducts(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async (userId) => {
    const response = await dispatch(getMyProducts({ userId: userId }));
    setProducts(response.payload);
  };

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
        dispatch(
          editOneProduct({
            id: product.id,
            findBy: "P. Venta",
            infoUpdated: `$${newprice}`,
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

  const selectAllProducts = () => {
    if (!selectedProducts.length > 0) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.Producto || "";
    const productCode = product.Código || "";

    return (
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="catalogPage">
        {!user && (
          <div>
            not registered
            <div>
              Registrate y mira nuestros {products?.length} productos existentes
            </div>
          </div>
        )}
        <div className="container">
          {/* {isAdmin && Number(user?.kyu) >= 9 && (
            <div>
              admin mode
              <button onClick={() => downloadFile()} className="catalogButton">
                DOWNLOAD EXCEL
              </button>
              <button onClick={() => fetchProducts()} className="catalogButton">
                GET ALL PRODUCTS
              </button>
            </div>
          )} */}
          <button onClick={() => nav("/onlist")} className="verFaltante">
            VER FALTANTE
          </button>

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
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredProducts.length !== 0 ? (
          <div className="myProducts">
            {filteredProducts.map((product) => (
              <div
                key={product?.id}
                onClick={() => handleProductSelection(product)}
                className={`productBg ${
                  selectedProducts.some((p) => p.id === product.id)
                    ? "selectedProduct"
                    : ""
                }`}
              >
                <img
                  alt=""
                  className="productImage"
                  src={product.image || productPlaceholder}
                />
                <div>{product?.Producto}</div>
                <div>{product?.["P. Venta"]}</div>
                <div>{product?.Código}</div>
              </div>
            ))}
          </div>
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
      </div>
    </>
  );
}

export default SuperCatalog;