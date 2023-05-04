import React, { useEffect } from 'react';
import CreateSucursal from '../../SuperUser/CreateSucursal/CreateSucursal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneSucursal } from '../../../features/sucursal/sucursalSlice';
import Cookies from 'universal-cookie';
function UserSucursal() {
    let dispatch = useDispatch()
    let cookie = new Cookies()
    let user = cookie.get('user')
    let sucursal = useSelector(state => state.sucursales.sucursal)
    useEffect(() => {
        if(user.id){
            dispatch(fetchOneSucursal({filter: 'UserId', value: user.id}))
        }
    }, [])
    return ( <>

        {!sucursal?.id && <CreateSucursal></CreateSucursal>}
        {sucursal && JSON.stringify(sucursal)}
    
    </> );
}

export default UserSucursal;