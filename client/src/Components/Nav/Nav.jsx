import React from "react";
import './Nav.css'
import FloatingMenu from './Menu/FloatingMenu.js'
import Menu from '../../Assets/Menu.png'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import Cookie from 'universal-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import UserNav from "../User/UserNav/UserNav";
let cookie = new Cookie()
export default function Nav (){
    let [state, setState] = useState({
        status: useSelector( status => status),
        productos: cookie.get('productsSent') || null
    })
    let productos = state.productos
    let nav = useNavigate()
    let user = useSelector(state => state.user) || cookie.get('user')
    let userSucursal = useSelector(state => state.sucursales?.sucursal)
    let [isMenuVisible, setMenuVisibility] = useState(false)
    function toggleMenu(){
        setMenuVisibility( isMenuVisible === true ? false : true)
    }
    return (<>
        <div className="nav">
            <div className="pagesButtonContainer">
                    <img onClick={() => {toggleMenu()}} src={Menu} className='menuPng'/>
                    {
                        isMenuVisible && <FloatingMenu closeCallback={() => toggleMenu()}></FloatingMenu>
                    }
                    {/* { productos && <input type={'text'} placeholder='Buscar el producto...'></input>} */}
                    {/* <button className="changePage" onClick={() => { nav('/home')}}>HOME</button>
                    <button className="changePage" onClick={() => { nav('/catalog')}}> CATALOG </button>
                    <button className="changePage" onClick={() => { nav('/update/price')}}>SEARCH</button> */}
                    <NavLink className= { 'changePage' } to={'/home'}><div className="navText">HOME</div></NavLink>
                    <NavLink className={ 'changePage' } to={'/catalog'}><div className="navText">CATALOG</div></NavLink>
                    {/* {user?.privileges && <NavLink className={ 'changePage' } to={'/search'}><div className="navText">SEARCH</div></NavLink>} */}
                    {user?.privileges && <NavLink className={ 'changePage' } to={'/tickets'}><div className="navText">Tickets</div></NavLink>}
                    {userSucursal?.id && <NavLink className={ 'changePage' } to={'/sucursal'}><div className="navText">Sucursal</div></NavLink>}
                    {/* {JSON.stringify(user)} */}
                    <UserNav user = {user} ></UserNav>
            </div>
        </div>
    </>)

}