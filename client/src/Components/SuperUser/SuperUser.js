import React from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import AssociateSucursal from "./AssociateSucursal/AssociateSucursal";
import CreateSucursal from "./CreateSucursal/CreateSucursal";
import CreateUser from "./CreateUser/CreateUser";
import "./SuperUser.css";

function SuperUser() {
  let cookie = new Cookies();
  let user = cookie.get("user");
  let sucursalState = useSelector((state) => state.sucursales);
  let userState = useSelector((state) => state.user);

  return (
    <>
      <div className="superUserContainer">
        {user?.privileges === "admin" ? (
          <>
            <h1 className="superUserTitle">Super Usuario</h1>
            <div className="formsContainer">
              <CreateUser />
              <CreateSucursal />
              <AssociateSucursal />
            </div>
            <div className="debugInfo">
              <h2>Debug Information</h2>
              <pre>{JSON.stringify(userState, null, 2)}</pre>
              <pre>{JSON.stringify(sucursalState, null, 2)}</pre>
            </div>
          </>
        ) : (
          <h1 className="accessDenied">No tienes acceso a esta página</h1>
        )}
      </div>
    </>
  );
}

export default SuperUser;