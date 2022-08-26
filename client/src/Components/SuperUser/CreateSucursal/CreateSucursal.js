import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOneSucursal } from '../../../features/sucursal/sucursalSlice';
import './CreateSucursal.css'
function CreateSucursal() {
    let dispatch = useDispatch()
    let [sucursalForm, setSucursalForm] = useState({
        name: '',
        image: '',
        phone: ''

    })
    let handleOnChange = (e) => {
        setSucursalForm({
            ...sucursalForm,
            [e.target.name]: e.target.value
        })
    }
    let handleOnSubmit = (e) => {
        e.preventDefault && e.preventDefault()
        console.log('Sucursal SUBMITED: '+ sucursalForm);
        dispatch( createOneSucursal({sucursal: sucursalForm}))
        // document.getElementsById('userCreateForm').reset()
    }
    return ( <>
        <div className='createSucursalFormContainer'>
        <form id='sucursalCreateForm' onSubmit={(e)=>{handleOnSubmit(e)}}>
            <div className='createSucursalFormGroupContainer'>
                <label>Nombre de Sucursal</label>
                <input name='name' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createSucursalFormGroupContainer'>
                <label>Imagen</label>
                <input name='image' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createSucursalFormGroupContainer'>
                <label>Celular</label>
                <input name='phone' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <button type='submit'>CREAR</button>
        </form>

        </div>
    
    </> );
}

export default CreateSucursal;