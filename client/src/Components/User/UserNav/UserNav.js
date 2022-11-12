import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserNav.css'
function UserNav(props) {
    let user = props.user
    let nav = useNavigate()
    let onUserClick = () => {
        user ? nav('/profile') : nav('/login')
    }
    return ( <>
        <div className='userNavThumb' onClick={() => onUserClick()} >
            <img className='userNavImage' src={user?.image || null} />
            
            <div>
                {user?.name || 'Login'}
            </div>  
        </div>
        
    
    </> );
}

export default UserNav;