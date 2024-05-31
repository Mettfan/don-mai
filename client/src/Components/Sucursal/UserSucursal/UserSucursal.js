import React, { useEffect } from "react";
import CreateSucursal from "../../SuperUser/CreateSucursal/CreateSucursal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneSucursal,
  getProductosExhibidos,
} from "../../../features/sucursal/sucursalSlice";
import Cookies from "universal-cookie";
import SucursalCard from "../../SucursalCard/SucursalCard";
import { getMyProducts } from "../../../features/products/productSlicetest";
import QRCode from "react-qr-code";
import "./UserSucursal.css";
import { useNavigate } from "react-router-dom";

function UserSucursal() {
  let dispatch = useDispatch();
  let nav = useNavigate();
  let userProducts = useSelector((state) => state?.products?.userProducts);
  let sucursalProducts = useSelector(
    (state) => state?.sucursales?.sucursalProducts
  );
  let cookie = new Cookies();
  let user = cookie.get("user");
  let sucursal = useSelector((state) => state?.sucursales?.sucursal);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOneSucursal({ filter: "UserId", value: user?.id }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sucursal?.id) {
      dispatch(getProductosExhibidos({ sucursalId: sucursal?.id }));
    }
  }, [dispatch, sucursal]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyProducts({ userId: user?.id }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="containerUserSucursal">
      {!sucursal?.id && user && <CreateSucursal />}
      {sucursal?.id && (
        <>
          <button
            className="button"
            onClick={() => nav("/sucursal/" + sucursal?.id)}
          >
            Ver Pagina
          </button>
          <QRCode
            size={256}
            className="qrCode"
            value={window.location.origin + "/sucursal/" + sucursal?.id}
          />
          <div className="sucursalCard">
            <SucursalCard
              title={sucursal.name}
              id={sucursal.id}
              userProducts={userProducts}
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
              sucursalImageOptions={{ width: "20%" }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserSucursal;