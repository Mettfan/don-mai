import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToShoppingCart } from '../../features/products/productSlicetest';
function AddProductToCart(props) {
    let dispatch = useDispatch()
    function addProductToCart(id){
        dispatch(addProductToShoppingCart({id}))
        console.log('ADDED : ' + id);
    }
    return ( <>
    
        <div>
            <button onClick={()=>{addProductToCart(props.id)}}>+1</button>
        </div>
    
    </> );
}

export default AddProductToCart;