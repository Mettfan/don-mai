import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";

export default function Catalog (){
    let store = useSelector( status => status )
    let dispatch = useDispatch()
    let [state, setState] = useState({
        store: store
    })
    function getAllProducts () {
        dispatch( getProducts() )
    }
    return (<>
    
        <div>
            <button onClick={ () => getAllProducts() }> GET </button>
            {JSON.stringify(state.store)}
        </div>


    </>)
}