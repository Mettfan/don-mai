import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../../features/users/userSlice';
import './Login.css'
function Login() {
    let dispatch = useDispatch()
    let serverResponse = useSelector( state => state.users?.response)
    let serverError = useSelector( state => state.users.error)
    let [state, setState] = useState({
        email: '',
        password: ''
    })
    let user = useSelector(state => state.users.user)
    let handleLoginSubmit = (e) => {
        e.preventDefault && e.preventDefault()
        dispatch(fetchOneUser({filter: 'email', value: state.email, password: state.password}))

    }
    let handleOnChange = (e) => {
        console.log(state);
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return ( <>
        <div className='loginContainer'>
            <h1>Inicia Sesión</h1>
            
            <form className='formContainer' onSubmit={(e)=>{handleLoginSubmit(e)}}>
                <div className='inputGroup'>
                    <label>E-mail</label>
                    <input name='email' onChange={(e)=>handleOnChange(e)}/>
                </div>
                <div className='inputGroup'>
                    <label>Contraseña</label>
                    <input name='password' type={'password'} onChange={(e)=>handleOnChange(e)}/>
                </div>
                <button className='loginButton' >Login</button>

            </form>
            {JSON.stringify(user)}
            {JSON.stringify(serverResponse)}
            {JSON.stringify(serverError)}

        </div>
    
    
    </> );
}

export default Login;