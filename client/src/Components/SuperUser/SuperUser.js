import React from 'react';
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import CreateSucursal from './CreateSucursal/CreateSucursal';
import CreateUser from './CreateUser/CreateUser';
function SuperUser() {
    let cookie = new Cookies()
    let user = cookie.get('user')
    let state = useSelector( state => state.sucursales)
    return ( <>
        {JSON.stringify(state)}
        {   user?.privileges === 'superuser' ?
            (<div>
            Super Usuario Here
            <CreateUser></CreateUser>
            <CreateSucursal></CreateSucursal>
        </div>): 
        'No tienes acceso a esta página'
        
        }
    
    </> );
}

export default SuperUser;