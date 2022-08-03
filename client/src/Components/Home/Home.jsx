import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cocacola from '../../Assets/cocacola.jpg'
import { getProducts } from "../../redux/actions/productActions";
import './Home.css'
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
    let [state, setState] = useState({
        productos: useSelector( status => status.status )

    })
    let productos = state.productos
    // useEffect( ( ) => {
    //     dispatch(getProducts())
    // }, [])

    let Departamentos = ( ) => {
        return (<>
            {/* <button className="clgProd" onClick={() => {console.log(productos)}}>CONSOLE PROD</button> */}
             {sampleDepartaments.map(departament => {
                 return (<div className="departamentContainer">
                    <div className="titleDepartament">
                        {departament.name}

                    </div>
                    <div className="separatorLine"></div>
                    <div className="listContainerDepartaments">
                        {samplePromos.map( el => <img src="https://www.comercialmexicana.eu/images/stories/virtuemart/product/salsa_valentina_amarilla_370ml.png" className="elementDepartaments"></img>)}
                    </div>
                 </div>)
             })}
        </>)
    }
    return <>
        <div className="home">
            <div className="promosHome">
                {samplePromos.map(promo => {
                    return (<div className="containerlist">
                        {/* <div> {promo.name} </div> */}
                        <img className="promoImg" src={promo.img}></img>
                        {/* <div> {promo.id} </div> */}
                    </div>)
                })}
            </div>
            <div className="carrouselHome">
                <div className="aHome">
                    <img className="bannerImg" src="https://img.freepik.com/vector-gratis/banner-promocion-2x1_52683-50845.jpg?w=2000"></img>
                </div>
                <div className="cHome">
                   {Departamentos()}
                </div>
            </div>
            
        </div>
            <div className="dHome">
                TOOLS
            </div>
    </>
}
