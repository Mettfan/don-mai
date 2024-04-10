import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchTickets,
  fetchFilteredTickets,
} from "../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import { useReactToPrint } from "react-to-print";
import "./Stats.css";

export function Stats() {
  const [manualDays, setManualDays] = useState("");
  const [manualInterestRate, setManualInterestRate] = useState("");
  const [manualInterest, setManualInterest] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalToPay, setTotalToPay] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  let nav = useNavigate();
  let dispatch = useDispatch();
  let cookie = new Cookies();
  let user = cookie.get("user");

  let userTickets = useSelector((state) => state.products.userTickets);
  let userTicketsP = userTickets?.filter((t) => t.description.toLowerCase() === "pending")

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ? componentRef.current : null,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  const getAllTickets = useCallback(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getUserTickets = useCallback(() => {
    dispatch(fetchFilteredTickets({ filter: "user", value: user?.name }));
  }, [dispatch, user?.name]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllTickets(), getUserTickets()]);
    };

    fetchData();
  }, []);

  const calculatePriceWithoutInterest = () => {
    const initialTotal = selectedTickets.reduce(
      (acc, ticket) => acc + parseFloat(ticket.Total),
      0
    );
    return initialTotal.toFixed(2);
  };

  const handleManualDaysChange = (event) => {
    const value = event.target.value;
    setManualDays(value);
    calculateManualInterest(value, manualInterestRate);
  };

  const handleManualInterestRateChange = (event) => {
    const value = event.target.value.replace(",", ".");
    if (value.match(/^\d*\.?\d{0,1}$/)) {
      setManualInterestRate(value);
      calculateManualInterest(manualDays, value);
    }
  };

  const calculateManualInterest = (days, interestRate) => {
    if (!isNaN(days) && !isNaN(interestRate)) {
      const baseValue = calculatePriceWithoutInterest();
      const dailyInterest = (baseValue * (interestRate / 100)).toFixed(2);
      setManualInterest(dailyInterest);
      const totalPendingTickets = (
        parseFloat(dailyInterest) * days +
        parseFloat(baseValue)
      ).toFixed(2);
      setTotalToPay(totalPendingTickets);
    }
  };

  const handleTicketClick = (ticket) => {
    const index = selectedTickets.findIndex(
      (selectedTicket) => selectedTicket.id === ticket.id
    );
    if (index !== -1) {
      const updatedSelectedTickets = [...selectedTickets];
      updatedSelectedTickets.splice(index, 1);
      setSelectedTickets(updatedSelectedTickets);
    } else {
      setSelectedTickets([...selectedTickets, ticket]);
    }
  };

  useEffect(() => {
    if (isPrinting) {
      handlePrint();
      setIsPrinting(false);
    }
  }, [isPrinting, handlePrint]);

  return (
    <>
    <div>
      <div className="manual-inputs">
            <p>Días transcurridos:</p>
            <input
              type="number"
              placeholder="Días"
              value={manualDays}
              onChange={handleManualDaysChange}
              min={0}
            />
            <p>Tasa de interés diaria (%):</p>
            <input
              type="number"
              placeholder="Tasa de interés"
              value={manualInterestRate}
              onChange={handleManualInterestRateChange}
              min={0}
            />
          </div>
      <div ref={componentRef} className="printContainer">
     
          <div className="info">
            <p>Días transcurridos: {manualDays}</p>
            <p>Tasa de interés diaria (%): {manualInterestRate}</p>
          </div>
       

        <div className="calculation">
          <p className="calculation-line">
            <span className="label">Interés por día:</span>
            <span className="value">${manualInterest}</span>
          </p>
          <p className="calculation-line">
            <span className="l">+</span>
          </p>
          <p className="calculation-line">
            <span className="label">Precio producto/s:</span>
            <span className="value">${calculatePriceWithoutInterest()}</span>
          </p>
          <p className="calculation-line equals">
            <span className="l">=</span>
          </p>
          <p className="calculation-line">
            <span className="label">Total a pagar:</span>
            <span className="value">${totalToPay}</span>
          </p>
        </div>
      </div>

      <button className="printButton" onClick={handlePrint}>
        Imprimir Detalles
      </button>
      <div>
        {userTicketsP?.map((ticket) => (
          <div
            className={
              selectedTickets.some(
                (selectedTicket) => selectedTicket.id === ticket.id
              )
                ? "ticketCard_selected"
                : "ticketCard"
            }
            key={ticket.id}
            onClick={() => handleTicketClick(ticket)}
          >
            <p className="ticketInfo">Id: {ticket.id}</p>
            <p className="ticketInfo">Descripción: {ticket.description}</p>
            <p className="ticketInfo">Total: ${ticket.Total}</p>
            <p className="ticketInfo">Cliente: {ticket.client}</p>
            <p className="ticketInfo">Fecha de creación: {ticket.createdAt}</p>
            {ticket.createdAt !== ticket.updatedAt && (
              <p className="ticketInfo">Último cambio: {ticket.updatedAt}</p>
            )}
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Stats;
