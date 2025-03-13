import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { fetchOneUser } from "../../features/users/userSlice";
import "./Login.css";
import LOGODONMAY from "../../Assets/LOGODONMAY.png";

function Login() {
  const cookie = new Cookies();
  const user = useSelector((state) => state.users.user) || cookie.get("user");
  const errorMessage = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.name) {
      navigate("/home");
      window.location.reload();
    }
  }, [user, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchOneUser({
        filter: "email",
        value: state.email,
        password: state.password,
      })
    );
  };

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginPageContainer">
      <img alt="Don May Logo" src={LOGODONMAY} className="loginPageLogo" />
      <h1>Inicia Sesión</h1>
      <form className="loginPageFormContainer" onSubmit={handleLoginSubmit}>
        <div className="loginPageInputGroup">
          <label>E-mail</label>
          <input
            name="email"
            onChange={handleOnChange}
            required
            className="loginPageInputField"
          />
        </div>
        <div className="loginPageInputGroup">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            required
            className="loginPageInputField"
          />
        </div>
        <button className="loginPageLoginButton">Login</button>
        <button
          className="loginPageRegisterButton"
          onClick={() => navigate("/register")}
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