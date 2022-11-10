import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../features/products/productSlicetest';
import {useNavigate} from 'react-router-dom'
function CreateProduct() {
    let nav = useNavigate()
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
        dispatch(postProduct([{...product}]))
        nav('/catalog')
        window.location.reload()
        
    }
    return ( <>

        <input placeholder='Producto' name = {'Producto'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Código' name = {'Código'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='P.Venta' name = {'P. Venta'} type={'number'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Departamento' name = {'Departamento'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <button onClick={() => { createProduct(state.product) } } >CREAR</button>
        {JSON.stringify(globalState.products.loading)}
    
    </> );
    
}


export default CreateProduct;