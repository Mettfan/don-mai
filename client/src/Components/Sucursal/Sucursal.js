import React, { useEffect } from 'react';
import AssociateSucursal from '../SuperUser/AssociateSucursal/AssociateSucursal';
import CreateSucursal from '../SuperUser/CreateSucursal/CreateSucursal';
import { useParams } from 'react-router';
import { fetchOneSucursal, getProductosExhibidos } from '../../features/sucursal/sucursalSlice';
import { useDispatch, useSelector } from 'react-redux';
import SucursalCard from '../SucursalCard/SucursalCard';
function Sucursal() {
    let params = useParams()
    let dispatch = useDispatch()
    let sucursalId = params?.id || null
    let sucursal = useSelector(state => state.sucursales.sucursal)
    let sucursalProducts = useSelector(state => state?.sucursales?.sucursalProducts)
    useEffect(() => {
        if(sucursal?.id){
            dispatch(getProductosExhibidos({sucursalId: sucursal?.id}))
        }
    }, [sucursal])
    // Mandamos a traer la sucursal
    useEffect(() => {
        dispatch(fetchOneSucursal({filter: 'id', value: sucursalId}))
    }, [])


    return ( <>
    
        <div>
            SUCURSAL
            {/* {JSON.stringify(params)}
            {JSON.stringify(sucursal)} */}


            <SucursalCard 
                title = {sucursal.name} 
                id = {sucursal.id}
                sucursalProducts = {sucursalProducts}
                sucursalImage = {sucursal?.image}
                // cardOptions = {}
                userProductsOptions = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  backgroundColor : 'red'}}
                sucursalProductsOptions = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  backgroundColor : 'red'}}
                sucursalImageOptions = {{width: '10%'}}
                disableButtons = {true}
            ></SucursalCard>
        </div>
    
    </> );
}

export default Sucursal;