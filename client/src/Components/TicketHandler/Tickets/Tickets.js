import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyTicket,
  fetchFilteredTickets,
  fetchTickets,
} from "../../../features/products/productSlicetest";
import Calendar from "react-calendar";
import Switch from "react-switch";
import "./Tickets.css";
import { useNavigate } from "react-router-dom";
import TicketCreator from "../TicketCreator/TicketCreator";
import Cookies from "universal-cookie";

function Tickets() {
  let nav = useNavigate();
  let cookie = new Cookies();
  let user = cookie.get("user");

  let dispatch = useDispatch();

  let userTickets = useSelector((state) => state.products.userTickets);
  const [filteredUserTickets, setFilteredUserTickets] = useState([]);

  const getAllTickets = useCallback(() => {
    dispatch(fetchTickets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserTickets = useCallback(() => {
    dispatch(fetchFilteredTickets({ filter: "user", value: user?.name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllTickets();
      await getUserTickets();
    };
    fetchData();
  }, [getAllTickets, getUserTickets]);

  useEffect(() => {
    console.log(user?.privileges, fetchFilteredTickets, userTickets);
    //IMPORTANTE!!!!!!!
    if (user?.privileges === "usuario") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const filteredTickets = userTickets?.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt);
        return ticketDate >= oneWeekAgo;
      });

      setFilteredUserTickets(filteredTickets);
    } else {
      setFilteredUserTickets(userTickets);
    }
  }, [userTickets, user?.privileges]);

  const date = new Date();
  let [ticketDate, setTicketDate] = useState(date);
  let [showCalendar, setShowCalendar] = useState(true);

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
                  className="deleteTicketButton"
                  onClick={() => {
                    onDeleteTicket(ticket?.id, user);
                  }}
                >
                  x
                </span>
              )}
              <span className="ticketTotal">{ticket["Total"]}</span>
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
    filteredUserTickets
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
          <div className="switchContainer">
            <label htmlFor="showCalendarSwitch">Mostrar Calendario</label>
            <Switch
              onChange={() => setShowCalendar(!showCalendar)}
              checked={showCalendar}
              id="showCalendarSwitch"
            />
          </div>
          {showCalendar && (
            <Calendar
              onChange={setTicketDate}
              value={ticketDate}
              defaultView={"month"}
            />
          )}
          <div className="calendarTicketContainer">
            <div className="calendarTicket">
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
          {filteredUserTickets?.length && currentTicketsCards()}
        </div>
      </div>
    </>
  );
}

export default Tickets;