import React, { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { createOneUser } from "../../../features/users/userSlice";
import "./CrearUser.css";

function CrearUser() {
  let dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phone: "",
    image: "",
    privileges: "usuario",
    disabled: false,
  });

  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  let handleSubmit = (e) => {
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

    dispatch(createOneUser({ user })).then((response) => {
      if (response.error) {
        if (response.error.message.includes("400")) {
          setError("El correo electrónico ya está en uso");
        } else {
          setError("Error interno del servidor");
        }
      }
    });
  };

  return (
    <div className="crearUserContainer">
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit} className="crearUserForm">
        <div className="formGroup">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Edad:</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Imagen (URL):</label>
          <input
            type="text"
            name="image"
            value={user.image}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label>Privilegios:</label>
          <select
            name="privileges"
            value={user.privileges}
            onChange={handleChange}
          >
            <option value="usuario">Usuario</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Cuenta Deshabilitada:</label>
          <input
            type="checkbox"
            name="disabled"
            checked={user.disabled}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submitButton">
          Crear
        </button>
      </form>
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default CrearUser;