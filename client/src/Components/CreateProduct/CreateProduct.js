import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../features/products/productSlicetest';
function CreateProduct() {
    let [state, setState] = useState({
        product: {}
    })
    let dispatch = useDispatch()
    let globalState = useSelector(state =>  state )
    let handleInputChange = (e) => {
        setState({
            ...state,
            product: {
                ...state.product,
                [e.target.name]: e.target.value
            }
        })
    }
    let createProduct = (product) => {
        console.log(product);
        dispatch(postProduct({...product}))
    }
    return ( <>

        <input placeholder='Producto' name = {'Producto'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Código' name = {'Código'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='P.Venta' name = {'P. Venta'} type={'number'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Departamento' name = {'Departamento'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <button onClick={() => { createProduct(state.product) } } ></button>
        {/* {JSON.stringify(globalState)} */}
    
    </> );
    
}


export default CreateProduct;