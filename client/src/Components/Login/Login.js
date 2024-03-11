import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { fetchOneUser } from "../../features/users/userSlice";
import "./Login.css";
function Login() {
  let cookie = new Cookies();
  let user = useSelector((state) => state.users.user) || cookie.get("user");
  useEffect(() => {
    if (user?.name) {
      nav("/home");
    }
  }, [user]);
  
  let dispatch = useDispatch();
  let nav = useNavigate();
  let serverResponse = useSelector((state) => state.users?.response);
  let serverError = useSelector((state) => state.users.error);
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  let handleLoginSubmit = (e) => {
    e.preventDefault && e.preventDefault();
    dispatch(
      fetchOneUser({
        filter: "email",
        value: state.email,
        password: state.password,
      })
    );
  };
  let handleOnChange = (e) => {
    console.log(state);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="loginContainer">
        <h1>Inicia Sesión</h1>
        <form
          className="formContainer"
          onSubmit={(e) => {
            handleLoginSubmit(e);
          }}
        >
          <div className="inputGroup">
            <label>E-mail</label>
            <input name="email" onChange={(e) => handleOnChange(e)} required />
          </div>
          <div className="inputGroup">
            <label>Contraseña</label>
            <input
              name="password"
              type={"password"}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </div>
          <button className="loginButton">Login</button>
        </form>
        <button
          className="loginButton"
          onClick={() => {
            nav("/register");
          }}
        >
          Register
        </button>
        {/* {JSON.stringify(user)}
                {JSON.stringify(serverResponse)}
                {JSON.stringify(serverError)} */}
        {JSON.stringify(user) !== ""
          ? JSON.parse(JSON.stringify(user)).message
          : null}
        {JSON.stringify(user) !== ""
          ? JSON.parse(JSON.stringify(user)).error
          : null}
        {JSON.stringify(serverError) !== "" ?  JSON.parse(JSON.stringify(serverError)) : null}
        {console.log(JSON.stringify(user), "USER")}
        {console.log(JSON.stringify(serverResponse), "SERVER RESPONSE")}
        {console.log(JSON.stringify(serverError), "ERROR")}
      </div>
    </>
  );
}

export default Login;