import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { associateOneSucursalToUser } from "../../../features/sucursal/sucursalSlice";
import "./AssociateSucursalToUser.css";

function AssociateSucursal() {
  let dispatch = useDispatch();
  let [sucursalForm, setSucursalForm] = useState({
    userId: null,
    sucursalId: null,
  });

  let handleOnChange = (e) => {
    setSucursalForm({
      ...sucursalForm,
      [e.target.name]: e.target.value,
    });
  };

  let handleOnSubmit = (e) => {
    e.preventDefault && e.preventDefault();
    dispatch(
      associateOneSucursalToUser({
        userId: sucursalForm.userId,
        sucursalId: sucursalForm.sucursalId,
      })
    );
  };

  return (
    <>
      <div className="associateSucursalFormContainer">
        <form
          className="associateSucursalForm"
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <div className="associateSucursalFormGroupContainer">
            <label>Id de Sucursal</label>
            <input
              name="sucursalId"
              type="number"
              placeholder="Ingrese el Id de la Sucursal"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="associateSucursalFormGroupContainer">
            <label>Id de Usuario</label>
            <input
              name="userId"
              type="number"
              placeholder="Ingrese el Id del Usuario"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <button type="submit" className="associateButton">
            Associate
          </button>
        </form>
        {JSON.stringify(sucursalForm)}
      </div>
    </>
  );
}

export default AssociateSucursal;