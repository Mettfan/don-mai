import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyTicket,
  fetchFilteredTickets,
  fetchTickets,
} from "../../../features/products/productSlicetest";
import Calendar from "react-calendar";
import "./Tickets.css";
import { useNavigate } from "react-router-dom";
import TicketCreator from "../TicketCreator/TicketCreator";
import Cookies from "universal-cookie";

function Tickets() {
  let nav = useNavigate();
  let cookie = new Cookies();
  let user = cookie.get("user");

  let dispatch = useDispatch();

  let tickets = useSelector((state) => state.products.tickets.response);
  let userTickets = useSelector((state) => state.products.userTickets);

  const getAllTickets = useCallback(() => {
    console.log(tickets);
    dispatch(fetchTickets());
  }, [dispatch, tickets]);

  const getUserTickets = useCallback(() => {
    console.log(tickets);
    dispatch(fetchFilteredTickets({ filter: "user", value: user?.name }));
  }, [dispatch, tickets, user?.name]);

  useEffect(() => {
    getAllTickets();
    getUserTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = new Date();
  let [ticketDate, setTicketDate] = useState(date);

  function onDeleteTicket(id, user) {
    dispatch(destroyTicket(id, user?.email));
  }

  if (!user) {
    return (
      <div>
        Please log in to view this page!
        <button onClick={() => nav("/register")}>Register</button>
      </div>
    );
  }

  let ticketCard = (ticket) => {
    let ticketDate = new Date(ticket?.createdAt);
    return (
      <div className="ticketsContainer">
        <div onClick={() => nav(`/tickets/${ticket?.id}`)}>
          <div className="ticketId">{ticket?.id}</div>
          <span>{JSON.stringify(ticketDate.toLocaleString())}</span>
          <div>{ticket?.user}</div>
          <div className="ticketProducts">
            {ticket?.Productos &&
              ticket?.Productos.map((product, index) => (
                <div key={index} className="productTicketCard">
                  <div className="productTicketsQuantity">
                    {product["quantity"]}
                  </div>
                  <div className="productTicketsName">
                    {product["Producto"]}
                  </div>
                  <div className="productTicketsPrice">
                    {product["P. Venta"]}
                  </div>
                </div>
              ))}
            <div
              className={
                ticket?.description === "out"
                  ? "ticketTotalOut"
                  : ticket?.description === "pending"
                  ? "ticketTotalPending"
                  : "ticketTotalEntry"
              }
            >
              {Number(user?.kyu) >= 9 && (
                <span
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    width: "10%",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                    right: "40%",
                    padding: "5px",
                    color: "white",
                  }}
                  onClick={() => {
                    onDeleteTicket(ticket?.id, user);
                  }}
                >
                  x
                </span>
              )}
              <span
                style={{
                  padding: "5px",
                }}
              >
                {ticket["Total"]}
              </span>
            </div>
          </div>
          <div className="ticketCreatedAt">
            {ticket["createdAt"].split("T")[0]}
          </div>
        </div>
      </div>
    );
  };

  let currentTickets = () =>
    userTickets
      ?.filter(
        (ticket) =>
          Number(ticket["createdAt"].split("T")[0].split("-")[1]) ===
          ticketDate.getMonth() + 1
      )
      ?.filter((ticket) => {
        let currentTicketDate = new Date(ticket["createdAt"]);
        return (
          Number(currentTicketDate.toLocaleString().split("/")[0]) ===
          ticketDate.getDate()
        );
      });

  let currentTicketsCards = () => {
    return currentTickets()
      ?.map((ticket) => {
        return <>{ticketCard(ticket)}</>;
      })
      .reverse();
  };

  function calculateDaily(type) {
    let accumulator = 0;
    currentTickets()?.forEach((ticket) => {
      if (ticket?.description === type) {
        accumulator += Number(ticket.Total);
      }
    });
    return accumulator;
  }

  function calculateMeanTicket(type) {
    let meanTicket = 0;
    let ticketCounter = 0;
    currentTickets()?.forEach((ticket) => {
      if (ticket.description === type) {
        meanTicket += Number(ticket.Total);
        ticketCounter += 1;
      }
    });
    meanTicket = Math.floor(meanTicket / ticketCounter);
    return [meanTicket, ticketCounter];
  }

  return (
    <>
      <div className="ticketMiniApp">
        <div className="calendarMiniApp">
          <h1>Seleccionar Fecha de Tickets</h1>
          <div className="calendarTicketContainer">
            <div className="calendarTicket">
              <Calendar
                onChange={setTicketDate}
                value={ticketDate}
                defaultView={"month"}
              />
              <TicketCreator />
              {currentTickets()?.length > 0 && (
                <div>
                  <div className="entryTotal">{calculateDaily("entry")}</div>
                  <div className="meanEntry">
                    <div>{String(calculateMeanTicket("entry")[1])}</div>
                    <div>{"entry tickets con promedio de: "}</div>
                    <div>
                      {"$" + String(calculateMeanTicket("entry")[0]) ||
                        "No hay Salida de Dinero"}
                    </div>
                  </div>
                  <div className="outTotal">{calculateDaily("out")}</div>
                  <div className="meanOut">
                    <div>{String(calculateMeanTicket("out")[1])}</div>
                    <div>{"out tickets con promedio de: "}</div>
                    <div>
                      {"$" + String(calculateMeanTicket("out")[0]) ||
                        "No hay Entrada de Dinero"}
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h3>Day Balance</h3>
                <h4>{calculateDaily("out") - calculateDaily("entry")}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="allTicketsContainer">
          {userTickets?.length && currentTicketsCards()}
        </div>
      </div>
    </>
  );
}

export default Tickets;