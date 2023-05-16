import React from 'react';
import './SucursalCard.css'
import ProductButtons from './ProductButtons/ProductButtons';

function SucursalCard(props) {
    let title = props?.title
    let sucursalId = props?.id
    let userProducts = props?.userProducts
    let sucursalProducts = props?.sucursalProducts
    let sucursalImage = props?.sucursalImage
    let cardOptions = {...props?.cardOptions}
    let userProductsOptions = {...props?.userProductsOptions}
    let sucursalProductsOptions = {...props?.sucursalProductsOptions}
    let sucursalImageOptions = {...props?.sucursalImageOptions}
    let disableButtons = props.disableButtons
    let PublicProducts = () => {
        return(<div className='PublicProductsContainer'>
            {sucursalProducts?.length >= 1 && sucursalProducts?.map(product => {
                return(<div className='PublicProductContainer'>
                    <div className='PublicProductNameContainer'>
                        <h2 className='PublicProductName'>
                            {product["Producto"]}
                        </h2>
                    </div>

                    <img src={product?.image} alt='Sin Imagen' className='PublicProductImage'></img>
                    <div className='PublicProductPriceContainer'>
                        <b className='PublicProductPrice'>{product["P. Venta"]}</b>
                    </div>
                    <ProductButtons button = { !disableButtons && 'desexhibir'} product = {product} sucursalId = {sucursalId}></ProductButtons>

                </div>)
            })}
        </div>)
    }
    
    let PrivateProducts = () => {
        return(<div className='PrivateProductsContainer'>

            {userProducts?.map(product => {
                return(<div className='PrivateProductContainer'>
                    <div className='PrivateProductNameContainer'>
                        <h2 className='PrivateProductName'>
                            {product["Producto"]}
                        </h2>
                    </div>
                    <img src={product?.image} alt='Sin Imagen' className='PrivateProductImage'></img>
                    <div className='PrivateProductPriceContainer'>
                        <b className='PrivateProductPrice'>{product["P. Venta"]}</b>
                    </div>

                    <ProductButtons  button = {!disableButtons &&'exhibir'} product = {product} sucursalId = {sucursalId}></ProductButtons>
                </div>)
            })}
        </div>)
    }

    return ( <>
        <div style={{...cardOptions}}>
            {/* {JSON.stringify(sucursalProducts)} */}
            <h1>{title}</h1>
            <img style={{...sucursalImageOptions}} src={sucursalImage}></img>
            <div className='bothPrivateAndPublicContainer'>
                {sucursalProducts && <div style={{...sucursalProductsOptions}}>
                    <div className='PublicProductsTitle'>
                        <h3>'Productos Exhibidos'</h3>
                    </div>
                    <PublicProducts></PublicProducts>
                </div>}
               {userProducts &&  <div style={{...userProductsOptions}}>
                    <div className='PrivateProductsTitle'>
                        <h3>'Mis Productos'</h3>
                    </div>
                    <PrivateProducts></PrivateProducts>
                </div>}
            </div>
        </div>
    </> );
}

export default SucursalCard;