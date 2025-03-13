import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
// import Mickey from "../../Assets/Mickey.png";
// import LOGODONMAY from "../../Assets/LOGODONMAY.png";
import "./PrintTest.css";
import {
  postTicket,
  sellProducts,
} from "../../features/products/productSlicetest";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

export const Example = (propsRoot) => {
  // const productState = useSelector((state) => state);
  let sucursal = useSelector((state) => state.sucursales?.sucursal);
  let cookie = new Cookies();
  let user = cookie.get("user");
  const date = new Date();
  let [state, setState] = useState({
    ticketId: 0,
    currentDateTime:
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
  });
  const ticketProducts = useSelector((state) => state.products.ticketProducts);
  let dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => {
      setState({
        ...state,
        currentDateTime:
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      });
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentDateTime]);

  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const currentDateTime = state.currentDateTime;
  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className="mainTicketContainer">
        <div className="informacionFiscal">
          <b className="ticketTitle">{sucursal?.name}</b>
          <img alt="" className="mickeyTicket" src={sucursal?.image} />
          <div>UserId: {" " + user.id}</div>
          <div>
            Este ticket <b>NO</b> es un comprobante Fiscal
          </div>
          <div>{currentDate}</div>
          <div>{currentDateTime}</div>
          {/* <div>Ticket  Id{' '+state.ticketId}</div> */}
        </div>
        <div className="divisorContainerStart"></div>
        <div>{propsRoot.ticket}</div>
        <div className="divisorContainerEnd"></div>
        <div>
          <div>www.donmay.com.mx</div>
        </div>
      </div>
    );
  });
  function handleOnAfterPrint() {
    window.location.reload();
  }
  function handleOnBeforePrint() {
    let total = 0;
    // Suma cada producto y manda su total
    ticketProducts.forEach((product) => {
      let price =
        product["P. Venta"][0] !== "$"
          ? Number(product["P. Venta"])
          : Number(product["P. Venta"].slice(1));
      total += price * Number(product["quantity"]);
      console.log({ price, total });
    });
    dispatch(sellProducts({ products: ticketProducts })).then(() => {
      dispatch(
        postTicket({
          products: ticketProducts,
          total: total,
          user: user?.email,
          client: null,
          description: "out",
        })
      ).then(() => {
        // console.log(productState?.products?.response );
        console.log("posteado");
      });
    });
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      handleOnAfterPrint();
    },
    onBeforePrint: () => {
      handleOnBeforePrint();
    },
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      {/* <button className="printButton" onClick={handlePrint}>COBRAR</button> */}
      {propsRoot?.payment && !propsRoot?.falta && (
        <button className="printButton" onClick={handlePrint}>
          COBRAR
        </button>
      )}
    </div>
  );
};