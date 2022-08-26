import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOneUser } from '../../../features/users/userSlice';
import './CreateUser.css'
function CreateUser() {
    let dispatch = useDispatch()
    let [userForm, setUserForm] = useState({
        name: '',
        username: '',
        privileges: '',
        email: '',
        password: '',
        age: null,
        image: '',
        phone: ''

    })
    let handleOnChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }
    let handleOnSubmit = (e) => {
        e.preventDefault && e.preventDefault()
        console.log('USER SUBMITED: '+ userForm);
        dispatch(createOneUser({user: userForm}))
        // document.getElementsById('userCreateForm').reset()
    }
    return ( <>
        <div className='createUserFormContainer'>
        <form id='userCreateForm' onSubmit={(e)=>{handleOnSubmit(e)}}>
            <div className='createUserFormGroupContainer'>
                <label>Nombre de Usuario a Crear</label>
                <input name='name' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Privilegios</label>
                <input name='privileges' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Username</label>
                <input name='username' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Email</label>
                <input name='email' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Password</label>
                <input name='password' type={'password'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Edad</label>
                <input name='age' type={'number'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Imagen</label>
                <input name='image' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <div className='createUserFormGroupContainer'>
                <label>Celular</label>
                <input name='phone' type={'text'} onChange={(e)=> handleOnChange(e)}/>
            </div>
            <button type='submit'>CREAR</button>
        </form>

        </div>
    
    </> );
}

export default CreateUser;