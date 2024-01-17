import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cocacola from '../../Assets/cocacola.jpg'
import './Home.css'
import { fetchAllProducts, getMyProducts } from "../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import BOXES from '../../Assets/boxes.png'
import BARCODE from '../../Assets/barcode.png'
import CATALOGO from '../../Assets/catalogo.png'
import GRAPH from '../../Assets/graph.png'
import USER from '../../Assets/user.png'
import LOGODONMAY from '../../Assets/LOGODONMAY.png'
import RECIBO from '../../Assets/RECIBO.png'
import CALCULATOR from '../../Assets/calculator.png'
import { useNavigate } from "react-router-dom";
import product from "../../redux/slices/products/product";
let tools = [
    {
        img: BOXES,
        goto: '/update/price'
    },
    {
        img: BARCODE,
        goto: '/search'
    },
    {
        img: CATALOGO,
        goto: '/catalog'
    },
    // {
    //     img: GRAPH
    // },
    {
        img: USER,
        goto: '/profile'

    },
    {
        img: RECIBO,
        goto: '/tickets'
    },
    // {
    //     img: CALCULATOR
    // },
    {
        img: LOGODONMAY,
        goto: '/tutorial'
    },
]
let samplePromos =[
    {
        name: 'Promo 1',
        img: cocacola,
        id: 0   
    },
    {
        name: 'Promo 2',
        img: cocacola,
        id: 1   
    },
    {
        name: 'Promo 3',
        img: cocacola,
        id: 2   
    },
    {
        name: 'Promo 4',
        img: cocacola,
        id: 3   
    },
    
]
let sampleDepartaments = [
    {
        name: 'Limpieza',
        id: 0
    },
    {
        name: 'Bimbo',
        id: 1
    },
    {
        name: 'Bimbo',
        id: 2
    }
]
export default function Home(){
    let dispatch = useDispatch()
    let nav = useNavigate()
    let products = useSelector(state => state.products.products)
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])
    // let [state, setState] = useState({
    //     userProducts: useSelector( status => status.status )

    // })
    let cookie = new Cookies()
    let user = cookie.get('user')
    let userProducts =  useSelector( status => status.products.userProducts )

    useEffect( ( ) => {
        if(user?.id){
            getUserProducts()
        }
    }, [])

    let getUserProducts = () => {
        dispatch(getMyProducts({userId: user.id}))
    }
    function extractDepartments (products){
        let departments = []
        products?.forEach(product => {
            if (!departments.find(department => department === product?.Departamento)){
                departments.push(product?.Departamento)
            }
        });
        console.log(departments);
        return departments
    }
    let Departamentos = ( ) => {
        return (<>
            {/* <button className="clgProd" onClick={() => {console.log(userProducts)}}>CONSOLE PROD</button> */}
             {extractDepartments(userProducts)?.slice(0, 10)?.map(departament => {
                let foundProducts = userProducts?.map(product => {
                    if((product?.Departamento === departament)){
                        return product

                    }
                })
                 return (<div className="departamentContainer">
                    <div className="titleDepartament">
                        {departament}

                    </div>
                    <div className="separatorLine"></div>
                    <div className="listContainerDepartaments">
                        {/* {JSON.stringify(foundProducts)} */}
                        {foundProducts && foundProducts?.map(foundProduct => {
                            if (foundProduct){
                                return (<div className="filteredProductContainer">
                                    <h3>{foundProduct?.Producto}</h3>
                                </div>)
                            }
                        }).slice(3)}
                        {/* {!(foundProducts.length > 0) ? foundProducts?.Producto : foundProducts?.map( product => {
                            <h3>{product?.Producto}</h3>
                        })} */}
                        {/* {foundProducts?.map( product => <img src={product.image} className="elementDepartaments"></img>)} */}
                    </div>
                 </div>)
             })}
             {/* {JSON.stringify(userProducts)} */}
        </>)
    }
    return <>
        <div className="home">
            <div className="promosHome">
                {products.slice(0, 10)?.map(recentProduct => {
                    return (<div className="containerlist">
                        <div> {recentProduct?.Producto} </div>
                        <img className="promoImg" src={recentProduct?.image}></img>
                        <div> {recentProduct['P. Venta']} </div>
                    </div>)
                }).reverse()}
            </div>
            <div className="carrouselHome">
                <div className="aHome">
                    {tools?.map( tool => {
                        return <img onClick={() => {nav(tool.goto)}} className="bannerImg" src={tool.img}></img>

                    })}
                    <div className="cHome">
                    {Departamentos()}
                    </div>
                </div>
            </div>
            
        </div>
        {/* <button onClick={() => {extractDepartments(userProducts)}}>EXTRACT</button> */}
            <div className="dHome">
                TOOLS
                <div>
                    Tool 1
                </div>
                <div>
                    Tool 2
                </div>
                <div>
                    Tool 3
                </div>
            </div>
    </>
}
