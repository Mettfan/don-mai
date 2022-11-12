import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './UserDetail.css'
function UserDetail(props) {
    let cookie = new Cookies() 
    let nav = useNavigate()
    let user = props.user || cookie.get('user')
    let handleOnLogOut = () => {
        cookie.remove('user')
        nav('/')
        window.location.reload()
    }
    return ( <>
    
    <div className='userDetailContainer' >
            <img className='userDetailImage' src={user.image} />

            <div className='userDetailInfo'>
                <div>
                    {user.name}
                </div>  
                <div>
                    {user.privileges}
                </div>  
                {/* {JSON.stringify(user)} */}
                <button className='logoutButton' onClick={() => {handleOnLogOut()}}>
                    Cerrar Sesión
                </button>
            </div>
            
        </div>
    
    </> );
}

export default UserDetail;