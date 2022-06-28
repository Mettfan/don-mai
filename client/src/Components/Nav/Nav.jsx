import React from "react";
import './Nav.css'
import Menu from '../../Assets/Menu.png'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import Cookie from 'universal-cookie'
let cookie = new Cookie()
export default function Nav (){
    let [state, setState] = useState({
        status: useSelector( status => status),
        productos: cookie.get('productsSent') || null
    })
    let productos = state.productos
    
    return (<>
        <div className="nav">
            <img src={Menu} className='menuPng'/>

            { productos && <input type={'text'} placeholder='Buscar el producto...'></input>}
             

        </div>
    </>)

}