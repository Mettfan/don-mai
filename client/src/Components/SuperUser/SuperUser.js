import React from 'react';
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import CreateUser from './CreateUser/CreateUser';
function SuperUser() {
    let cookie = new Cookies()
    let user = cookie.get('user')
    // let state = useSelector( state => state.user)
    return ( <>
        {JSON.stringify(user)}
        {   user?.privileges === 'superuser' ?
            (<div>
            Super Usuario Here
            <CreateUser></CreateUser>
        </div>): 
        'No tienes acceso a esta página'
        
        }
    
    </> );
}

export default SuperUser;