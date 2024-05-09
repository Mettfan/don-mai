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

  let [error, setError] = useState("");

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
        <Link to="/Login" className="registerLink">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <button className="registerButton">Registrar</button>
      </form>
    </div>
  );
}

export default Register;