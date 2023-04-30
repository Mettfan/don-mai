import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProducts, removeProduct } from '../../../features/products/productSlicetest';
import Cookies from 'universal-cookie';
function MyProducts() {
    
    let cookie = new Cookies()
    let userProducts = useSelector(state => state.products.userProducts)
    let dispatch = useDispatch()
    let user = cookie.get('user')
    let getUserProducts = () => {
        dispatch(getMyProducts({userId: user.id}))
    }
    useEffect(() => {
        if(user){
            getUserProducts()
        }
    }, [])
    let deleteProduct = (productId, userId) => {
        console.log(productId, userId);
        dispatch(removeProduct({userId, productId})).then(() => {
            getUserProducts()
        })
    }
    return ( <>
    
        <div>
            <button onClick={() => {getUserProducts()}}>GET USER PRODUCTS</button>
            <div style={{display: 'flex'}}>
                {userProducts.map(product => {
                    return (<div className='productBg' >
                        <div>{product.Producto}</div>
                        <div>{product['P. Venta']}</div>
                        <div>{product['Código']}</div>
                        <button onClick={() => deleteProduct(product['id'], user.id)}>X</button>
                    </div>)
                })}

            </div>
        </div>
    
    </> );
}

export default MyProducts;