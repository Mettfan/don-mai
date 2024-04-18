import React, { useEffect, useState } from "react";
import "./Catalog.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
// import { getProducts } from "../../redux/actions/productActions";
// import { fetchAllProducts } from "../../redux/slices/products/product";
import {
  editOneProduct,
  fetchOneProduct,
  fetchAllProducts as fetchProducts,
  getMyProducts,
  matchProduct,
  postProduct,
  setCounter,
} from "../../features/products/productSlicetest";
import productPlaceholder from "../../Assets/productPlaceholder.png";
import { checkIfProductIsUpdated } from "../UpdatePrice/UpdatePrice/updateTools";
import { useNavigate } from "react-router-dom";
// import AddProductToCart from "../../app/AddProductToCart/AddProductToCart";
// import CreateProduct from "../CreateProduct/CreateProduct";
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
        console.log(newprice);
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
      // Si el producto no está en el array, lo agregamos
      setSelectedProducts([...selectedProducts, product]);
    } else {
      // Si el producto está en el array, lo eliminamos
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(index, 1);
      setSelectedProducts(updatedProducts);
    }
  };

  useEffect(() => {
    if (user) {
      getUserProducts();
    }
  }, []);
  let nav = useNavigate();
  let todaysDate = new Date();
  let editMode = props.editmode;
  const productState = useSelector((state) => state);
  const productList = productState.products.products;
  let cookie = new Cookies();
  // let store = useSelector( status => status )
  let dispatch = useDispatch();
  // let [state, setState] = useState({
  //     store: store,
  //     response: cookie.get('response')
  // })
  // let response = state.response

  let userProducts = useSelector((state) => state.products?.userProducts);
  function downloadFile() {
    downloadExcel(userProducts);
  }
  function getAllProducts() {
    dispatch(fetchProducts());
  }
  let user = cookie.get("user");
  let createProduct = async (product, userId) => {
    // Para crearlo sin Id y no arroje error en el backend quitamos la propiedad Id para que no se refiera al mismo producto, sino a la copia
    product = {
      ["Código"]: product["Código"] || null,
      ["Producto"]: product["Producto"] || null,
      ["P. Venta"]: product["P. Venta"] || null,
      ["P. Compra"]: product["P. Compra"] || null,
      // ['updatedAt']: product['updatedAt'] || null,
      // ['createdAt']: product['createdAt'] || null,
      // ['quantity']: product['quantity'] || 0,
      ["Departamento"]: product["Departamento"] || null,
      ["image"]: product["image"] || null,
      // ['sales']: product['sales'] || 0,
      ["brand"]: product["brand"] || null,
    };
    console.log(product);
    let promise = new Promise((resolve, reject) => {
      dispatch(
        postProduct({ products: [{ ...product }], userId: userId })
      ).then(() => {
        console.log("created!");
        resolve("OKCREATED");
      });
    });
    await promise
      .then((result) => {
        dispatch(getMyProducts({ userId: userId }));
        console.log(result);
      })
      .then(() => {
        nav("/catalog");
      });
  };
  let addProduct = async (product, userId) => {
    console.log(product, userId);
    createProduct(product, userId);
    //     dispatch(getMyProducts())

    // Lo siguiente es la version funcional de la asociacion con el producto indicado. Fue reemplazado por la creación de un nuevo producto similar al elegido
    // console.log(userId, productId);
    // dispatch(matchProduct({userId, productId})).then(() => {
    //     dispatch(getMyProducts())
    //     window.location.reload()
    // })
  };
  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

  return (
    <>
      <div>
        {/* <div>
            <CreateProduct></CreateProduct>
        </div> */}
        <div>
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
          {user?.privileges === "admin" && Number(user?.kyu) >= 9 && (
            <div>
              admin mode
              <button onClick={() => downloadFile()}> DOWNLOAD EXCEL </button>
              <button onClick={() => getAllProducts()}>
                {" "}
                GET ALL PRODUCTS{" "}
              </button>
            </div>
          )}
          <button onClick={() => nav("/onlist")}> VER FALTANTE </button>

          {/* La siguiente linea de Código dirige a un apartado para completar cierta información acerca de los Productos */}
          {userProducts.length > 0 && (
            <button onClick={() => nav("/complete/product/info")}>
              COMPLETE PRODUCT INFO
            </button>
          )}
          {userProducts.length !== 0 ? (
            <MyProducts
              selectedProducts={selectedProducts}
              editMode={editMode}
              handleProductSelection={handleProductSelection}
            ></MyProducts>
          ) : (
            <button
              onClick={() => {
                nav("/upload/product");
              }}
            >
              Create One Product
            </button>
          )}
          <div>
            {selectedProducts.length > 0 && (
              <button onClick={handleEditProduct}>
                Editar Productos Seleccionados
              </button>
            )}

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
                          <button
                            onClick={executeAction}
                            className="boton-sumar"
                          >
                            {quantityToAdd > 0 ? "Sumar" : "Restar"} Cantidad
                          </button>
                        </div>
                      )}

                      <div className="productos-a-modificar">
                        <h3>Productos que van a ser modificados:</h3>
                        <ul>
                          {selectedProducts.map((product, index) => (
                            <li key={index}>
                              {product.Código} - {product["P. Venta"]}{" "}
                              {console.log(product)}
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
        {user?.privileges === "admin" &&
          productList?.slice(0, props?.items || 20)?.map((product) => {
            // return  product[props.filter] === props.value &&
            return (
              <div className="catalogContainer" key={user.id}>
                <span className="productBg">
                  <img
                    alt=""
                    className="productImage"
                    src={productPlaceholder}
                  />
                  <div className="productInfoContainer">
                    <button onClick={() => addProduct(product, user.id)}>
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
                    {/* <AddProductToCart id={product.id} ></AddProductToCart> */}
                    {/* <RemoveProductToCart></RemoveProductToCart> */}
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
