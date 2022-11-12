import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOneUser } from '../../features/users/userSlice';
import './Register.css'
function Register() {
    let dispatch = useDispatch()
    let nav = useNavigate()
    let [user, setUser] = useState({
        name: '',
        age: null,
        email: '',
        password: '',
        confirmPassword: '',
        privileges: 'usuario'
    })
    let handleRegisterSubmit = (e) => {
        e.preventDefault && e.preventDefault()
        dispatch(createOneUser({user})).then(() => {
            nav('/login')
        } )

    }
    let handleOnChange = (e) => {
        console.log(user);
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    return ( <>
        <div className='registerContainer'>
            <h1>Regístrate</h1>
            
            <form className='formContainer' onSubmit={(e)=>{handleRegisterSubmit(e)}}>
                <div className='inputGroup'>
                    <label>Nombre</label>
                    <input name='name' onChange = { (e) => handleOnChange(e)}/>
                </div>
                <div className='inputGroup'>
                    <label>Edad</label>
                    <input name='age' type={'number'} onChange = { (e) => handleOnChange(e)}/>
                </div>
                <div className='inputGroup'>
                    <label>E-mail</label>
                    <input name='email' onChange = { (e) => handleOnChange(e)}/>
                </div>
                <div className='inputGroup'>
                    <label>Contraseña</label>
                    <input name='password' type={'password'} onChange = { (e) => handleOnChange(e)}/>
                </div>
                <div className='inputGroup'>
                    <label>Confirmar Contraseña</label>
                    <input name='confirmPassword' type={'password'} onChange = { (e) => handleOnChange(e)}/>
                </div>
                <button className='registerButton' >Register</button>

            </form>

        </div>
    
    
    </> );
}

export default Register;