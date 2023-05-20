import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProduct, getMyProducts, removeProduct } from '../../../features/products/productSlicetest';
import Cookies from 'universal-cookie';
import './MyProducts.css'
function MyProducts(props) {
    
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
    function selectProduct(id){
        if(props.editMode){
            dispatch(fetchOneProduct( {filter: 'id' , value: id }))

        }
      }
    return ( <>
    
        <div>
            {/* <button onClick={() => {getUserProducts()}}>GET USER PRODUCTS</button> */}
            <div className='myProducts'>
                {userProducts.map(product => {
                    return (<div onClick={() => {selectProduct(product.id)}} className='productBg' >
                        <div>{product.Producto}</div>
                        <div>{product['P. Venta']}</div>
                        <div>{product['Código']}</div>
                        <div>{product['quantity']}</div>
                        <button onClick={() => deleteProduct(product['id'], user.id)}>X</button>
                    </div>)
                })}

            </div>
        </div>
    
    </> );
}

export default MyProducts;