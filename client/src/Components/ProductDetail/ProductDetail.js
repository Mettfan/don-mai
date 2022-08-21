import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../../features/products/productSlicetest";
export default function ProductDetail(){
    let params = useParams()
    let dispatch = useDispatch()
    let selectedProduct = useSelector(state => state.products.selectedProduct)
    useEffect(()=>{
        dispatch(fetchOneProduct({filter: 'id', value: params.id}))
    }, [])
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


        </div>
        
    
    </>)
}