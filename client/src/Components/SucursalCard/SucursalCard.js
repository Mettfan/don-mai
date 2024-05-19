import React from "react";
import "./SucursalCard.css";
import ProductButtons from "./ProductButtons/ProductButtons";

function SucursalCard(props) {
  let title = props?.title;
  let sucursalId = props?.id;
  let userProducts = props?.userProducts;
  let sucursalProducts = props?.sucursalProducts;
  let sucursalImage = props?.sucursalImage;
  let cardOptions = { ...props?.cardOptions };
  let userProductsOptions = { ...props?.userProductsOptions };
  let sucursalProductsOptions = { ...props?.sucursalProductsOptions };
  let sucursalImageOptions = { ...props?.sucursalImageOptions };
  let disableButtons = props.disableButtons;

  let PublicProducts = () => {
    return (
      <div className="PublicProductsContainer">
        {sucursalProducts?.length >= 1 &&
          sucursalProducts?.map((product) => {
            return (
              <div className="PublicProductContainer" key={product.id}>
                <div className="PublicProductNameContainer">
                  <h2 className="PublicProductName">{product["Producto"]}</h2>
                </div>
                <img
                  src={product?.image}
                  alt="Sin Imagen"
                  className="PublicProductImage"
                />
                <div className="PublicProductPriceContainer">
                  <b className="PublicProductPrice">{product["P. Venta"]}</b>
                </div>
                <ProductButtons
                  button={!disableButtons && "desexhibir"}
                  product={product}
                  sucursalId={sucursalId}
                ></ProductButtons>
              </div>
            );
          })}
      </div>
    );
  };

  let PrivateProducts = () => {
    return (
      <div className="PrivateProductsContainer">
        {userProducts?.map((product) => {
          return (
            <div className="PrivateProductContainer" key={product.id}>
              <div className="PrivateProductNameContainer">
                <h2 className="PrivateProductName">{product["Producto"]}</h2>
              </div>
              <img
                src={product?.image}
                alt="Sin Imagen"
                className="PrivateProductImage"
              />
              <div className="PrivateProductPriceContainer">
                <b className="PrivateProductPrice">{product["P. Venta"]}</b>
              </div>
              <ProductButtons
                button={!disableButtons && "exhibir"}
                product={product}
                sucursalId={sucursalId}
              ></ProductButtons>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="sucursalCardContainer" style={{ ...cardOptions }}>
      <h1 className="sucursalTitle">{title}</h1>
      <img
        className="sucursalImage"
        style={{ ...sucursalImageOptions }}
        src={sucursalImage}
        alt="Sucursal"
      />
      <div className="bothPrivateAndPublicContainer">
        {sucursalProducts && (
          <div style={{ ...sucursalProductsOptions }}>
            <div className="PublicProductsTitle">
              <h3>Productos Exhibidos</h3>
            </div>
            <PublicProducts />
          </div>
        )}
        {userProducts && (
          <div style={{ ...userProductsOptions }}>
            <div className="PrivateProductsTitle">
              <h3>Mis Productos</h3>
            </div>
            <PrivateProducts />
          </div>
        )}
      </div>
    </div>
  );
}

export default SucursalCard;