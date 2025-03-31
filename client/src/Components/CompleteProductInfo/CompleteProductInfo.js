import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editOneProduct, fetchAllProducts, fetchOneProduct } from '../../features/products/productSlicetest';
import Cookies from "universal-cookie";

function CompleteProductInfo() {
    let params = useParams()
    let nav = useNavigate()
    let products = useSelector(state => state?.products?.userProducts)
    let [state, setState] = useState({
        products4Complete: []
    })
    let cookie = new Cookies();
    let user = cookie.get("user");
    let dispatch = useDispatch()
    function onProductsChangeAttribute(e){
        // Busca el producto y cambia su atributo seleccionado por el valor del input
        setState({...state, products4Complete: state.products4Complete?.map(product => {
            if(product.Código === e.target.name){
                return {...product, [params["attribute"]]: e.target.value}
            }
            else{
                return product
            }
        })})
    }
    function attributeOnSubmit(e, barcode){
        let productSelected = state.products4Complete?.find(product => product?.Código === barcode)
        e?.preventDefault()
        console.log(e.target.name, barcode)
        console.log(e.target.value)
        console.log(productSelected);
        dispatch(editOneProduct({id: productSelected?.id, findBy: e.target.name, infoUpdated: productSelected[params?.attribute], userId: user.id})).then(()=>{
            window.location.reload()
        })


    }

    useEffect(() => {
        setState({...state, products4Complete: products?.filter(product => ((product[params?.attribute] === null) || (product[params?.attribute] <= 0) ) )})
    }, [params])
    useEffect(() => {
        if(params?.attribute){
            setTimeout(() => {
                document.getElementById(params?.attribute + 'Complete')
                //.click()
                console.log(params?.attribute);

            }, 2000)
        }
    }, [])
    return ( <>
    
        <div>
            ELIJA QUE CLASE DE INFORMACION DESEA COMPLETAR:
        </div>
        <button id={'P. CompraComplete'} onClick={() => nav('/complete/product/P. Compra')}>
            P. Compra
        </button>
        <button id={'P. VentaComplete'} onClick={() => nav('/complete/product/P. Venta')}>
            P. Venta
        </button>
        <button id={'quantityComplete'} onClick={() => nav('/complete/product/quantity')}>
            quantity
        </button>
        <div>
            {state?.products4Complete?.map(product => {
                return (<form name={params?.attribute} onSubmit={(e) => {attributeOnSubmit(e, product?.Código)}}>
                    <div>{product?.Producto}</div>
                    <div>{product?.Código}</div>
                    <div>{product?.quantity}</div>
                    {product?.Producto && <input name={product?.Código}  type={'text'} onChange={(e) => onProductsChangeAttribute(e)}></input>}
                </form>)
            })}
        </div>
        

    </> );
}

export default CompleteProductInfo;