import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Barcode from "react-barcode";
import favImg from '../../Assets/fav.png'
import {
  editOneProduct,
  eraseProduct,
  fetchAllProducts,
  fetchOneProduct,
} from "../../features/products/productSlicetest";
import "./ProductDetail.css";
import { getMyProducts } from "../../features/products/productSlicetest";
import { useReactToPrint } from "react-to-print";
import ConfirmationModal from "../Catalog/MyProducts/ConfirmationModal";

export default function ProductDetail() {
  let userProducts = useSelector((state) => state.products?.userProducts);
  let cookie = new Cookies();
  let user = cookie.get("user");
  let params = useParams();
  let dispatch = useDispatch();
  let nav = useNavigate();
  
  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };
  
  useEffect(() => {
    dispatch(fetchOneProduct({ filter: "id", value: params.id }));
  }, [dispatch, params.id]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  let deleteProduct = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };
  
  const confirmDeleteProduct = () => {
    dispatch(eraseProduct(selectedProductId))
    .then(() => {
      nav("/catalog");
    })
    .then(() => {
      dispatch(fetchAllProducts());
    });
    setModalOpen(false);
  };
  
  useEffect(() => {
    if (user) {
      getUserProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let toggleFav = (id, currentState) => {
    console.log(currentState);
    console.log(!currentState);
    dispatch(
      editOneProduct({
        id: id,
        findBy: "disabled",
        infoUpdated: Boolean(!currentState),
        userId: user.id
      })
    ).then((response) => {
      document.location.reload()
      console.log(response);
    })
  }

  let [favImgState, setFavImgState] = useState()
  let product = {};
  if (userProducts && userProducts.length > 0) {
    product = userProducts.find((p) => p.id == params.id) || {};
  }
  // setFavImgState(product)
  console.log(product);
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <>
      <div className="productDetailContainer">
        <div className="productDetailTitle">Detalle del Producto</div>
        <div className="productDetailItem">
          <span className="productDetailLabel">ID:</span>
          <span className="productDetailValue">{params.id}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Nombre:</span>
          <span className="productDetailValue">{product["Producto"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Precio de Venta:</span>
          <span className="productDetailValue">{product["P. Venta"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Código:</span>
          <span className="productDetailValue">{product["Código"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Departamento:</span>
          <span className="productDetailValue">{product["Departamento"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Cantidad:</span>
          <span className="productDetailValue">{product["quantity"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Estado:</span>
          <span className="productDetailValue">{product["description"]}</span>
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Favorito:</span>
          <img className={product?.disabled?"favImgStateActive":"favImgStateInactive"} src={favImg} onClick={() => {toggleFav(product['id'], product['disabled'] )}}></img>
          {/* <span className="productDetailValue">{String(product["disabled"])}</span> */}
          {/* {String(product.disabled)} */}
        </div>
        <div className="productDetailItem">
          <span className="productDetailLabel">Última Actualización:</span>
          <span className="productDetailValue">{product["updatedAt"]}</span>
        </div>
        <div className="productDetailBarcode" ref={componentRef}>
          <Barcode value={product["Código"]} />
        </div>
        <button className="printButton" onClick={handlePrint}>
          Imprimir Código de Barras
        </button>
        <button
          onClick={() => deleteProduct(product["id"])}
          className="deleteProductButton"
        >
          X Borrar Producto
        </button>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeleteProduct}
        question="¿Estás seguro de que deseas eliminar este producto?"
      />
    </>
  );
}