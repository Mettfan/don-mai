import React from 'react';
import Convert from '../../Components/Convert/Convert';
import CreateProduct from '../../Components/CreateProduct/CreateProduct';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UploadProduct() {
    let cookie = new Cookies()
    let user = useSelector(state => state.user) || cookie.get('user')
    let nav = useNavigate()
    return ( <>
        {
            user?.privileges ?
        <div>
            <Convert></Convert>
            <CreateProduct></CreateProduct>

        </div>
        :
        <div onClick={() => nav('/register')}>Registrate</div>
        }

        
    </> );
}

export default UploadProduct;