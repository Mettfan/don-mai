import React from 'react';
import { NavLink } from 'react-router-dom';
import './FloatingMenu.css'
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function FloatingMenu({ closeCallback }) {
    let cookie = new Cookies()
    let user = useSelector(state => state.user) || cookie.get('user')

    return ( <>
        <div className='menuContainer'>
            <div className='closeButtonContainer'>
                <button className='closeMenuButton' onClick={() => closeCallback()}>X</button>
                <h1 className='menuTitle'>Menu</h1>
            </div>
            
           
            {user?.privileges === 'admin' && <NavLink className= { 'changePage' } to={'/upload/product'}><div className="navText">CREATE</div></NavLink>}
            {user?.privileges === 'admin' &&  <NavLink className={ 'changePage' } to={'/update/price'}><div className="navText">EDIT</div></NavLink>}
            {user?.privileges === 'admin' && <NavLink className={ 'changePage' } to={'/print/list'}><div className="navText">PRINT</div></NavLink>}

        </div>
    
        
    
    </> );
}

export default FloatingMenu;