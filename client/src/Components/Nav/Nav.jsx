import React from "react";
import './Nav.css'
import Menu from '../../Assets/Menu.png'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import Cookie from 'universal-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
let cookie = new Cookie()
export default function Nav (){
    let [state, setState] = useState({
        status: useSelector( status => status),
        productos: cookie.get('productsSent') || null
    })
    let productos = state.productos
    let nav = useNavigate()
    return (<>
        <div className="nav">
            <img src={Menu} className='menuPng'/>

            {/* { productos && <input type={'text'} placeholder='Buscar el producto...'></input>} */}
             {/* <button className="changePage" onClick={() => { nav('/home')}}>HOME</button>
             <button className="changePage" onClick={() => { nav('/catalog')}}> CATALOG </button>
             <button className="changePage" onClick={() => { nav('/update/price')}}>SEARCH</button> */}
            <NavLink className= { 'changePage' } to={'/home'}><div className="navText">HOME</div></NavLink>
            <NavLink className={ 'changePage' } to={'/catalog'}><div className="navText">CATALOG</div></NavLink>
            <NavLink className={ 'changePage' } to={'/update/price'}><div className="navText">SEARCH</div></NavLink>
        </div>
    </>)

}