import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { associateOneSucursalToUser, createOneSucursal } from '../../../features/sucursal/sucursalSlice';
import './CreateSucursal.css'
import LOGODONMAY from '../../../Assets/LOGODONMAY.png'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';

function CreateSucursal() {
    let dispatch = useDispatch()
    let cookie = new Cookies()
    let user = cookie.get('user')
    let nav = useNavigate()
    let serverResponse = useSelector(state => state?.sucursales?.response)
    let SUCURSALGLOBAL = useSelector(state => state?.sucursales)
    useEffect(() => {
        let associatedUserId = serverResponse?.associationResponse?.id
        if (associatedUserId){
            window.location.reload()
        }
    }, [serverResponse])

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
    let handleOnSubmit = async (e) => {
        e.preventDefault && e.preventDefault()
        dispatch( createOneSucursal({sucursal: sucursalForm, userId: user.id}))
       
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
            <img style={{width: '50%'}} src={sucursalForm.image || LOGODONMAY} alt='Imagen no disponible, intente otra'></img>
            <div className='createSucursalFormGroupContainer'>
                <label>Celular</label>
                <input name='phone' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <button type='submit'>CREAR</button>
        {JSON.stringify(SUCURSALGLOBAL)}
        </form>

        </div>
    
    </> );
}

export default CreateSucursal;