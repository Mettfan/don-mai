import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { associateOneSucursalToUser } from '../../../features/sucursal/sucursalSlice';
import './AssociateSucursalToUser.css'
function AssociateSucursal() {
    let dispatch = useDispatch()
    let [sucursalForm, setSucursalForm] = useState({
        userId: null,
        sucursalId:null
    })
    let handleOnChange = (e) => {
        setSucursalForm({
            ...sucursalForm,
            [e.target.name]: e.target.value
        })
    }
    let handleOnSubmit = (e) => {
        e.preventDefault && e.preventDefault()
        dispatch( associateOneSucursalToUser({userId: sucursalForm.userId, sucursalId: sucursalForm.sucursalId}))
        // document.getElementsById('userCreateForm').reset()
    }
    return ( <>

        <div>
            <form className='associateSucursalToUserFormContainer' onSubmit={(e)=>{handleOnSubmit(e)}}>
            <div className='associateSucursalToUserFormGroupContainer'>
                <label>Id de Sucursal</label>
                <input name='sucursalId' type={'number'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='associateSucursalToUserFormGroupContainer'>
                <label>Id de Usuario</label>
                <input name='userId' type={'number'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <button type='submit'>Associate</button>


            </form>
            {JSON.stringify(sucursalForm)}
        </div>
    
    
    </> );
}

export default AssociateSucursal;