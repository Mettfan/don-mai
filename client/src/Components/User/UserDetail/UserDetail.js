import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { editOneUser } from '../../../features/users/userSlice';
import './UserDetail.css'
function UserDetail(props) {
    let dispatch = useDispatch()
    let [imageUrl, setImageUrl] = useState('')
    let cookie = new Cookies() 
    let nav = useNavigate()
    let user = props.user || cookie.get('user')
    let handleOnLogOut = () => {
        cookie.remove('user')
        nav('/')
        window.location.reload()
    }
    let onURLchange = (e) => {
        setImageUrl(e.target.value)
    }
    let changeProfileImage = (url) => {
        console.log({id: user.id, findBy: 'image', infoUpdated: url});
        dispatch(editOneUser({id: user.id, findBy: 'image', infoUpdated: url}))
    }
    
    return ( <>
    
    <div className='userDetailContainer' >
            <img className='userDetailImage' src={imageUrl || user.image} />
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
            <input placeholder='URL de Imagen' type={'text'} onChange={(e) => {onURLchange(e)}}  ></input>
            <button onClick={() => {changeProfileImage(imageUrl) }} >Upload</button>
            {imageUrl}
        </div>
    
    </> );
}

export default UserDetail;