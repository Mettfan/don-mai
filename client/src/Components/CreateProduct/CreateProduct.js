import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchProduct, postProduct } from '../../features/products/productSlicetest';
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie';
function CreateProduct() {
    let cookie = new Cookies()
    let user = cookie.get('user')
    let serverResponse = useSelector( state => state.products.response)
    let serverError = useSelector( state => state.products.error)
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
    let createProduct = (product, userId) => {
        console.log(product);
        dispatch(postProduct({products: [{...product}], userId: userId})).then(() => {
            console.log("created!");

        })
        
    }
    let associateProduct = (productId, userId) => {
        console.log(productId, userId);
        dispatch(matchProduct({productId, userId})).then(() => {
            console.log('matched');
        })
    }
    return ( <>

        <input placeholder='Producto' name = {'Producto'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Código' name = {'Código'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='P.Venta' name = {'P. Venta'} type={'number'} onChange={( (e) => {handleInputChange(e)})} />
        <input placeholder='Departamento' name = {'Departamento'} type={'text'} onChange={( (e) => {handleInputChange(e)})} />
        <button onClick={() => { createProduct(state.product, user.id ) } } >CREAR</button>
        <button onClick={() => { associateProduct(49, 1) }} >associateProduct</button>
        {JSON.stringify(serverResponse)}
        {JSON.stringify(serverError)}
        {JSON.stringify(user)}
    
    </> );
    
}


export default CreateProduct;