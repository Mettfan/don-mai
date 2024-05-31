import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOneUser } from "../../../features/users/userSlice";
import "./CreateUser.css";

function CreateUser() {
  let dispatch = useDispatch();
  let [userForm, setUserForm] = useState({
    name: "",
    username: "",
    privileges: "",
    email: "",
    password: "",
    age: null,
    image: "",
    phone: "",
  });

  let handleOnChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  let handleOnSubmit = (e) => {
    e.preventDefault && e.preventDefault();
    console.log("USER SUBMITED: " + userForm);
    dispatch(createOneUser({ user: userForm }));
  };

  return (
    <div className="createUserFormContainer">
      <form
        id="userCreateForm"
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        className="createUserForm"
      >
        <div className="createUserFormGroupContainer">
          <label>Nombre</label>
          <input
            name="name"
            type="text"
            placeholder="Ingrese el nombre"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Privilegios</label>
          <select name="privileges" onChange={(e) => handleOnChange(e)}>
            <option value="">Seleccione los privilegios</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="createUserFormGroupContainer">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Ingrese el username"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Ingrese el email"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Ingrese el password"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Edad</label>
          <input
            name="age"
            type="number"
            placeholder="Ingrese la edad"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Imagen (URL)</label>
          <input
            name="image"
            type="text"
            placeholder="Ingrese el URL de la imagen"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="createUserFormGroupContainer">
          <label>Celular</label>
          <input
            name="phone"
            type="tel"
            placeholder="Ingrese el número de celular"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <button type="submit" className="createUserButton">
          CREAR
        </button>
      </form>
    </div>
  );
}

export default CreateUser;