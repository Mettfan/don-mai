import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOneUser } from "../../features/users/userSlice";
import "./Register.css";

function Register() {
  let dispatch = useDispatch();
  let nav = useNavigate();
  let [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    privileges: "usuario",
  });
  let [terms, setTerms] = useState(false);
  let [privacy, setPrivacy] = useState(false);
  

  let [error, setError] = useState("");
  let handleareTermsAccepted = (e) => {

    setTerms(!terms)
  }
  let handlearePrivacyAccepted = (e) => {

    setPrivacy(!privacy)
  }


  function openInNewTab(url) {
    window.open(url, '_blank');
  }
  let handleRegisterSubmit = (e) => {
    e.preventDefault && e.preventDefault();

    if (parseInt(user.age) < 18) {
      setError("Debes ser mayor de edad para registrarte");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      setError("El correo electrónico no es válido");
      return;
    }

    if (user.password.length > 100) {
      setError("La contraseña no puede superar los 100 caracteres");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!terms){
      setError('Acepta los Terminos y Condiciones')
      return;
    }
    if (!privacy){
      setError('Acepta el Aviso de Privacidad')
      return;
    }
    dispatch(createOneUser({ user })).then((response) => {
      if (response.error) {
        if (response.error.message.includes("400")) {
          setError("El correo electrónico ya está en uso");
        } else {
          setError("Error interno del servidor");
        }
      } else {
        nav("/login");
      }
    });
  };

  let handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="registerContainer">
      <h1>Regístrate</h1>
      <form
        className="registerFormContainer"
        onSubmit={(e) => {
          handleRegisterSubmit(e);
        }}
      >
        <div className="registerInputGroup">
          <label>Nombre</label>
          <input
            required
            name="name"
            onChange={(e) => handleOnChange(e)}
            maxLength={100}
          />
        </div>
        <div className="registerInputGroup">
          <label>Edad</label>
          <input
            required
            name="age"
            type={"number"}
            min="1"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="registerInputGroup">
          <label>E-mail</label>
          <input required name="email" onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="registerInputGroup">
          <label>Contraseña</label>
          <input
            required
            name="password"
            type={"password"}
            onChange={(e) => handleOnChange(e)}
            maxLength={100}
          />
        </div>
        <div className="registerInputGroup">
          <label>Confirmar Contraseña</label>
          <input
            required
            name="confirmPassword"
            type={"password"}
            maxLength={100}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        {error && <p className="registerErrorMessage">{error}</p>}
        <div className="termsContainer">

          <div className={!terms?"termsContainerInactive":"termsContainerActive"}>
            {<span> He Leído y acepto los <b className= {'link'}onClick={() => openInNewTab('/terms')}>Términos y Condiciones de Uso</b>.</span>}
            <input value={ document.getElementById('areTermsAccepted') ? document.getElementById('areTermsAccepted') : false } id='areTermsAccepted' type='checkbox' name='areTermsAccepted' onChange={(e) => handleareTermsAccepted(e)}></input>
          </div>
          <div className={!privacy?"termsContainerInactive":"termsContainerActive"}>
            {<span>He leído el <b className="link" onClick={() => openInNewTab('/privacy')}>Aviso de Privacidad</b>.</span>}
            <input value={ document.getElementById('arePrivacyAccepted') ? document.getElementById('arePrivacyAccepted') : false } id='arePrivacyAccepted' type='checkbox' name='arePrivacyAccepted' onChange={(e) => handlearePrivacyAccepted(e)}></input>
          </div>

        </div>

        <Link to="/Login" className="registerLink">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <button className="registerButton"  >Registrar</button>
      </form>
    </div>
  );
}

export default Register;