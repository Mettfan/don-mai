import React, { useEffect } from 'react';
import AssociateSucursal from '../SuperUser/AssociateSucursal/AssociateSucursal';
import CreateSucursal from '../SuperUser/CreateSucursal/CreateSucursal';
import { useParams } from 'react-router';
import { fetchOneSucursal } from '../../features/sucursal/sucursalSlice';
import { useDispatch, useSelector } from 'react-redux';
function Sucursal() {
    let params = useParams()
    let dispatch = useDispatch()
    let sucursalId = params?.id || null
    let sucursal = useSelector(state => state.sucursales.sucursal)

    // Mandamos a traer la sucursal
    useEffect(() => {
        dispatch(fetchOneSucursal({filter: 'id', value: sucursalId}))
    }, [])


    return ( <>
    
        <div>
            SUCURSAL
            {JSON.stringify(params)}
            {JSON.stringify(sucursal)}
            {/* <AssociateSucursal></AssociateSucursal> */}
        </div>
    
    </> );
}

export default Sucursal;