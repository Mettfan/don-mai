import React, { useState } from "react";
import './Catalog.css'
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getProducts } from "../../redux/actions/productActions";
import { fetchAllProducts } from "../../redux/slices/products/product";
import { fetchAllProducts  as fetchProducts, getMyProducts, matchProduct, setCounter } from '../../features/products/productSlicetest';
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { checkIfProductIsUpdated } from "../UpdatePrice/UpdatePrice/updateTools";
import { useNavigate } from "react-router-dom";
import AddProductToCart from "../../app/AddProductToCart/AddProductToCart";
import CreateProduct from "../CreateProduct/CreateProduct";
import MyProducts from "./MyProducts/MyProducts";
export default function Catalog (props){
    let nav = useNavigate()
    let todaysDate = new Date()
    let editMode = props.editmode
    const productState = useSelector( state => state)
    const productList = productState.products.products
    let cookie = new Cookies()
    let store = useSelector( status => status )
    let dispatch = useDispatch()
    let [state, setState] = useState({
        store: store,
        response: cookie.get('response')
    })
    let response = state.response
    function downloadExcel () {
        dispatch( fetchAllProducts() )
    }
    function getAllProducts () {
        dispatch( fetchProducts() )
    }
    let user = cookie.get('user')
    let addProduct = (productId, userId) => {
        console.log(userId, productId);
        dispatch(matchProduct({userId, productId})).then(() => {
            dispatch(getMyProducts())
            window.location.reload()
        })
    }
    return (<>
    
        <div>
        {/* <div>
            <CreateProduct></CreateProduct>
        </div> */}
            <div>

                {    !user && <div>
                    not registered
                    <div>
                        Registrate y mira nuestros {productList?.length} productos existentes
                    </div>
                </div> }
                {    user?.privileges === 'usuario' && <div>
                    usuario mode
                </div> }
                {    user?.privileges === 'admin' && <div>
                    admin mode
                    <button onClick={ () => downloadExcel() }> DOWNLOAD EXCEL </button>
                    <button onClick={ () => getAllProducts() }>  GET ALL PRODUCTS </button>
                </div> }

                {/* La siguiente linea de Código dirige a un apartado para completar cierta información acerca de los Productos */}
                <button onClick={() => nav('/complete/product/info')} >COMPLETE PRODUCT INFO</button>
                <MyProducts></MyProducts>
                

            </div>
            {productList.map( product => {
                // return  product[props.filter] === props.value &&
                return ( <div className="catalogContainer">
                    <span className="productBg">
                        <img className="productImage" src={productPlaceholder }/>
                        <div className="productInfoContainer">
                            <button onClick={() => addProduct(product.id, user.id)}>ADD</button>
                            <div onClick={()=>{ nav('/products/'+product.id) }} >{product.Producto}</div>
                            <div>{product['P. Venta']}</div>
                            {/* <AddProductToCart id={product.id} ></AddProductToCart> */}
                            {/* <RemoveProductToCart></RemoveProductToCart> */}
                            {editMode && <div>{product.id}</div>}
                            {editMode && <div>{checkIfProductIsUpdated(
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[1]),
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[2]),
                                todaysDate.getMonth()+1,
                                todaysDate.getDate(),
                                'onlyNumbers'
                                
                                )}</div>}
                            {editMode && <div style={{
                                cursor: 'pointer'
                                
                            }} onClick={ () => dispatch(setCounter(product['Código'])) }>
                                
                                    Edit
                                
                                </div>}
                        </div>


                    </span>

                </div>)
            })}
        </div>

        

    </>)
}