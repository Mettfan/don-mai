import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getProducts } from "../../redux/actions/productActions";
import { fetchAllProducts } from "../../redux/slices/products/product";

export default function Catalog (){
    let cookie = new Cookies()
    let store = useSelector( status => status )
    let dispatch = useDispatch()
    let [state, setState] = useState({
        store: store,
        response: cookie.get('response')
    })
    let response = state.response
    function getAllProducts () {
        dispatch( fetchAllProducts() )
    }
    return (<>
    
        <div>
            <button onClick={ () => getAllProducts() }> GET </button>
            {JSON.stringify(state.store)}
            
            
        </div>


    </>)
}