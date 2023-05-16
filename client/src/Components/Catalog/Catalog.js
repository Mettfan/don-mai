import React, { useEffect, useState } from "react";
import './Catalog.css'
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getProducts } from "../../redux/actions/productActions";
import { fetchAllProducts } from "../../redux/slices/products/product";
import { fetchOneProduct, fetchAllProducts  as fetchProducts, getMyProducts, matchProduct, postProduct, setCounter } from '../../features/products/productSlicetest';
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { checkIfProductIsUpdated } from "../UpdatePrice/UpdatePrice/updateTools";
import { useNavigate } from "react-router-dom";
import AddProductToCart from "../../app/AddProductToCart/AddProductToCart";
import CreateProduct from "../CreateProduct/CreateProduct";
import MyProducts from "./MyProducts/MyProducts";
import { downloadExcel } from "../Convert/Convert";


export default function Catalog (props){
    useEffect(() => {
        if(user){
            getUserProducts()
        }
    }, [])
    let nav = useNavigate()
    let todaysDate = new Date()
    let editMode = props.editmode
    const productState = useSelector( state => state)
    const productList = productState.products.products
    let cookie = new Cookies()
    let store = useSelector( status => status )
    let dispatch = useDispatch()
    let [state, setState] = useState({
        store: store,
        response: cookie.get('response')
    })
    let response = state.response

    let userProducts = useSelector(state => state.products?.userProducts)
    function downloadFile () {
        downloadExcel(userProducts)
    }
    function getAllProducts () {
        dispatch( fetchProducts() )
    }
    let user = cookie.get('user')
    let createProduct = async (product, userId) => {
        // Para crearlo sin Id y no arroje error en el backend quitamos la propiedad Id para que no se refiera al mismo producto, sino a la copia
        product = {
            ['Código']: product['Código'] || null,
            ['Producto']: product['Producto'] || null,
            ['P. Venta']: product['P. Venta'] || null,
            ['P. Compra']: product['P. Compra'] || null,
            // ['updatedAt']: product['updatedAt'] || null,
            // ['createdAt']: product['createdAt'] || null,
            // ['quantity']: product['quantity'] || 0,
            ['Departamento']: product['Departamento'] || null,
            ['image']: product['image'] || null,
            // ['sales']: product['sales'] || 0,
            ['brand']: product['brand'] || null,
          }
        console.log(product);
        let promise = new Promise((resolve, reject) => {
            dispatch(postProduct({products: [{...product}], userId: userId})).then(() => {
                console.log("created!");
                resolve('OKCREATED')
    
            })

        })
        await promise.then(result => {
            dispatch(getMyProducts({userId: userId}))
            console.log(result);

        }).then(() => {
            nav('/catalog')
        })
        
    }
    let addProduct = async (product, userId) => {

        console.log(product, userId);
        createProduct(product, userId)
    //     dispatch(getMyProducts())


        // Lo siguiente es la version funcional de la asociacion con el producto indicado. Fue reemplazado por la creación de un nuevo producto similar al elegido
        // console.log(userId, productId);
        // dispatch(matchProduct({userId, productId})).then(() => {
        //     dispatch(getMyProducts())
        //     window.location.reload()
        // })
    }
    let getUserProducts = () => {
        dispatch(getMyProducts({userId: user.id}))
    }
    
    return (<>
    
        <div>
        {/* <div>
            <CreateProduct></CreateProduct>
        </div> */}
            <div>

                {    !user && <div>
                    not registered
                    <div>
                        Registrate y mira nuestros {productList?.length} productos existentes
                    </div>
                </div> }
                {    user?.privileges === 'usuario' && <div>
                    usuario mode
                </div> }
                {    user?.privileges === 'admin' && <div>
                    admin mode
                    <button onClick={ () => downloadFile() }> DOWNLOAD EXCEL </button>
                    <button onClick={ () => getAllProducts() }>  GET ALL PRODUCTS </button>
                </div> }

                {/* La siguiente linea de Código dirige a un apartado para completar cierta información acerca de los Productos */}
                {userProducts.length > 0 && <button onClick={() => nav('/complete/product/info')} >COMPLETE PRODUCT INFO</button>}
                {userProducts.length !==  0 ? <MyProducts editMode = {editMode}></MyProducts> : <button onClick={() => {nav('/upload/product')}}>Create One Product</button> }
                

            </div>
            { user?.privileges === 'admin' &&  productList.map( product => {
                // return  product[props.filter] === props.value &&
                return ( <div className="catalogContainer">
                    <span className="productBg">
                        <img className="productImage" src={productPlaceholder }/>
                        <div className="productInfoContainer">
                            <button onClick={() => addProduct(product, user.id)}>ADD</button>
                            <div onClick={()=>{ nav('/products/'+product.id) }} >{product.Producto}</div>
                            <div>{product['P. Venta']}</div>
                            {/* <AddProductToCart id={product.id} ></AddProductToCart> */}
                            {/* <RemoveProductToCart></RemoveProductToCart> */}
                            {editMode && <div>{product.id}</div>}
                            {editMode && <div>{checkIfProductIsUpdated(
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[1]),
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[2]),
                                todaysDate.getMonth()+1,
                                todaysDate.getDate(),
                                'onlyNumbers'
                                
                                )}</div>}
                            {editMode && <div style={{
                                cursor: 'pointer'
                                
                            }} onClick={ () => dispatch(setCounter(product['Código'])) }>
                                
                                    Edit
                                
                                </div>}
                        </div>


                    </span>

                </div>)
            })}
        </div>

        

    </>)
}