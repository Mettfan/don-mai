import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { fetchOneUser } from "../../features/users/userSlice";
import "./Login.css";
import LOGODONMAY from "../../Assets/LOGODONMAY.png";

function Login() {
  let cookie = new Cookies();
  let user = useSelector((state) => state.users.user) || cookie.get("user");
  let errorMessage = useSelector((state) => state.users.error);
  console.log(errorMessage);
  let dispatch = useDispatch();
  let nav = useNavigate();
  let [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.name) {
      nav("/home");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  let handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchOneUser({
        filter: "email",
        value: state.email,
        password: state.password,
      })
    );
  };

  let handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginPageContainer">
      <img alt="Don May Logo" src={LOGODONMAY} className="loginPageLogo" />
      <h1>Inicia Sesión</h1>
      <form
        className="loginPageFormContainer"
        onSubmit={(e) => {
          handleLoginSubmit(e);
        }}
      >
        <div className="loginPageInputGroup">
          <label>E-mail</label>
          <input
            name="email"
            onChange={(e) => handleOnChange(e)}
            required
            className="loginPageInputField"
          />
        </div>
        <div className="loginPageInputGroup">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={(e) => handleOnChange(e)}
            required
            className="loginPageInputField"
          />
        </div>
        <button className="loginPageLoginButton">Login</button>

        <button
          className="loginPageRegisterButton"
          onClick={() => {
            nav("/register");
          }}
        >
          Register
        </button>
        {errorMessage && (
          <div className="loginPageErrorMessage">
            {errorMessage || "Error de inicio de sesión"}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;