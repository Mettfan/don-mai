import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { eraseProduct, fetchAllProducts, fetchOneProduct } from "../../features/products/productSlicetest";
import './ProductDetail.css'
export default function ProductDetail(){
    let params = useParams()
    let dispatch = useDispatch()
    let selectedProduct = useSelector(state => state.products.selectedProduct)
    let nav = useNavigate()
    useEffect(()=>{
        dispatch(fetchOneProduct({filter: 'id', value: params.id}))
    }, [])
    let deleteProduct = ( id ) => {
        console.log('DELETING: '+ id);
        dispatch(eraseProduct(id)).then(() => {
            nav('/catalog')
        }).then(() => {
            dispatch(fetchAllProducts())
        }) 
        
    }
    return(<>
        <div>
            Product Detail with id:  {' ' +params.id}
            <div>
                {selectedProduct['Producto']}
            </div>
            <div>
                {selectedProduct['P. Venta']}
            </div>
            <div>
                {selectedProduct['Código']}
            </div>
            <div>
                {selectedProduct['Departamento']}
            </div>
            <div>
                {selectedProduct['updatedAt']}
            </div>

            <button onClick={() => deleteProduct(selectedProduct['id'])} className="deleteProductButton">
                X Borrar Producto
            </button>


        </div>
        
    
    </>)
}