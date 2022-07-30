import React, { useState } from "react";
import './Catalog.css'
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getProducts } from "../../redux/actions/productActions";
import { fetchAllProducts } from "../../redux/slices/products/product";
import { fetchAllProducts  as fetchProducts } from '../../features/products/productSlicetest';
import productPlaceholder from '../../Assets/productPlaceholder.png'
export default function Catalog (){
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
    return (<>
    
        <div>
            <div>
                <button onClick={ () => downloadExcel() }> DOWNLOAD EXCEL </button>
                {/* {JSON.stringify(state.store)} */}
                
                
                <button onClick={ () => getAllProducts() }>  GET ALL PRODUCTS </button>

            </div>
            {productList.map( product => {
                return ( <div className="catalogContainer">
                    <span className="productBg">
                        <img className="productImage" src={productPlaceholder }/>
                        <div className="productInfoContainer">
                            <div>{product.Producto}</div>
                            <div>{product['P. Venta']}</div>

                        </div>

                    </span>

                </div>)
            })}
        </div>


    </>)
}