import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  fetchOneSucursal,
  getProductosExhibidos,
} from "../../features/sucursal/sucursalSlice";
import { useDispatch, useSelector } from "react-redux";
import SucursalCard from "../SucursalCard/SucursalCard";
import "./Sucursal.css"; // Importa el archivo CSS

function Sucursal() {
  let params = useParams();
  let dispatch = useDispatch();
  let sucursalId = params?.id || null;
  let sucursal = useSelector((state) => state.sucursales.sucursal);
  let sucursalProducts = useSelector(
    (state) => state?.sucursales?.sucursalProducts
  );

  useEffect(() => {
    if (sucursal?.id) {
      dispatch(getProductosExhibidos({ sucursalId: sucursal?.id }));
    }
  }, [sucursal, dispatch]);

  // Mandamos a traer la sucursal
  useEffect(() => {
    dispatch(fetchOneSucursal({ filter: "id", value: sucursalId }));
  }, [dispatch, sucursalId]);

  return (
    <div className="sucursalContainer">
      <h1 className="sucursalTitle">SUCURSAL</h1>

      {sucursal && (
        <SucursalCard
          title={sucursal.name}
          id={sucursal.id}
          sucursalProducts={sucursalProducts}
          sucursalImage={sucursal?.image}
          userProductsOptions={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
          sucursalProductsOptions={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
          sucursalImageOptions={{ width: "10%" }}
          disableButtons={true}
        />
      )}
    </div>
  );
}

export default Sucursal;