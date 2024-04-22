import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTicketById,
  editOneTicket,
  fetchFilteredTickets,
} from "../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import PrintComponent from "../TicketHandler/PrintComponent.js/PrintComponent";
import "./TicketDetail.css";
import printerPng from "../../Assets/printer.png";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function TicketDetail() {
  let params = useParams();
  let ticket = useSelector((state) => state.products.ticket);
  let dispatch = useDispatch();
  let nav = useNavigate();
  let cookie = new Cookies();
  let user = cookie.get("user");
  const [ticketid, setTicketId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTicketById(params?.id));
  }, [dispatch, params?.id]);

  const handleCredit = async (creditData) => {
    try {
      dispatch(editOneTicket(creditData));
      dispatch(fetchFilteredTickets({ filter: "user", value: creditData.user }))
        .then(setIsModalOpen(false))
        .then(window.location.reload());
    } catch (error) {
      console.error("Error al editar o filtrar los tickets:", error);
    }
  };

  let ReturnToTickets = () => {
    nav("/tickets");
  };

  let TicketToPrint = ({ ticket }) => {
    return (
      <>
        <table className="ticketTable">
          <thead>
            <tr className="ticketTableTitles">
              <td>{"Cant."}</td>
              <td>{"Concepto"}</td>
              <td>{"Precio"}</td>
            </tr>
          </thead>
          <tbody>
            {ticket?.Productos?.map((producto) => (
              <tr key={producto.id} className="ticketsProductRow">
                <td>{Number(producto?.quantity)}</td>
                <td>{producto?.Producto?.substring(0, 20)}</td>
                <td>{producto["P. Venta"] && producto["P. Venta"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totalTicket">{"Estado: " + ticket.description}</div>
        {ticket.description === "pending" && (
          <div className="totalTicket">Deudor: {ticket?.client}</div>
        )}
        <div className="totalTicket">{"A pagar:  $" + ticket?.Total}</div>
        <div className="totalTicket">{"User: " + ticket?.user}</div>
      </>
    );
  };

  return (
    <>
      <div className="ticketDetailContainer">
        {ticket?.id ? (
          <PrintComponent
            buttonComponent={
              <img alt="" src={printerPng} style={{ width: "50px" }}></img>
            }
            component={<TicketToPrint ticket={ticket}></TicketToPrint>}
          ></PrintComponent>
        ) : (
          <ReturnToTickets></ReturnToTickets>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTicketId(ticket.id);
            setIsModalOpen(true);
          }}
        >
          Cambiar estado
        </button>
      </div>
      <ConfirmationModal
        TicketId={ticketid}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCredit}
        question="¿Desea pagar a crédito?"
        user_name={user?.name}
      />
    </>
  );
}

export default TicketDetail;