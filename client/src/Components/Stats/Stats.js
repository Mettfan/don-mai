import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [ticketsToPrint, setTicketsToPrint] = useState([]);

  // let nav = useNavigate();
  let dispatch = useDispatch();
  let cookie = new Cookies();
  let user = cookie.get("user");

  let userTickets = useSelector((state) => state.products.userTickets);
  let userTicketsP = userTickets?.filter(
    (t) => t.description.toLowerCase() === "pending"
  );

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => (componentRef.current ? componentRef.current : null),
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

  useEffect(() => {
    calculateManualInterest(manualDays, manualInterestRate);
  }, [manualDays, manualInterestRate, selectedTickets]);

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
      setTicketsToPrint(ticketsToPrint.filter((t) => t.id !== ticket.id));
    } else {
      setSelectedTickets([...selectedTickets, ticket]);
      setTicketsToPrint([...ticketsToPrint, ticket]);
    }
  };

  const handleSortByDateChange = (event) => {
    const value = event.target.value;
    setSortByDate(value);
    if (value === "newest" || value === "oldest") {
      setSortByPrice("");
    }
  };

  const handleSortByPriceChange = (event) => {
    const value = event.target.value;
    setSortByPrice(value);

    if (value === "lowest" || value === "highest") {
      setSortByDate("");
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
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Buscar por nombre del cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={sortByDate}
            onChange={(e) => handleSortByDateChange(e)}
          >
            <option value="">Ordenar por fecha</option>
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
          </select>
          <select
            value={sortByPrice}
            onChange={(e) => handleSortByPriceChange(e)}
          >
            <option value="">Ordenar por precio</option>
            <option value="highest">Más alto</option>
            <option value="lowest">Más bajo</option>
          </select>
        </div>
        <div className="manual-inputs">
          <div className="input-group">
            <p>
              <strong>Días transcurridos:</strong>
            </p>
            <input
              className="calc"
              type="number"
              placeholder="Días"
              value={manualDays}
              onChange={handleManualDaysChange}
              min="0"
            />
          </div>
          <div className="input-group">
            <p>
              <strong>Tasa de interés diaria (%):</strong>
            </p>
            <input
              className="calc"
              type="number"
              placeholder="Tasa de interés"
              value={manualInterestRate}
              onChange={handleManualInterestRateChange}
              min="0"
            />
          </div>
        </div>
        <div ref={componentRef} className="printContainerStat">
          <div className="info">
            <p className="p">Días transcurridos: {manualDays}</p>
            <p className="p">Tasa de interés diaria: {manualInterestRate}%</p>
          </div>
          <div ref={componentRef} className="printContainerStat">
            {ticketsToPrint.length > 0 ? (
              ticketsToPrint.map((ticket) => (
                <div key={ticket.id}>
                  <p className="p">ID del ticket: {ticket.id}</p>
                  <p className="p">Cliente: {ticket.client}</p>
                  <p className="p">Productos:</p>
                  {ticket.Productos.map((product) => (
                    <div key={product.id}>
                      <p className="p">Producto: {product.Producto}</p>
                      <p className="p">
                        Precio de venta: ${product["P. Venta"]}
                      </p>
                    </div>
                  ))}
                  <p className="p">Total: ${ticket.Total}</p>
                </div>
              ))
            ) : (
              <p className="p">
                No hay tickets seleccionados. Por favor, selecciona algún
                ticket.
              </p>
            )}
          </div>

          <div className="calculation">
            <p className="calculation-line">
              <span className="label">Interés por día:</span>
              <span className="value">${manualInterest}</span>
            </p>
            <p className="calculation-line">
              <span className="lspan">+</span>
            </p>
            <p className="calculation-line">
              <span className="label">Precio producto/s:</span>
              <span className="value">${calculatePriceWithoutInterest()}</span>
            </p>
            <p className="calculation-line equals">
              <span className="lspan">=</span>
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
          {userTicketsP
            ?.filter((ticket) =>
              ticket.client.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
              if (sortByDate === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
              } else if (sortByDate === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
              } else if (sortByPrice === "highest") {
                return parseFloat(b.Total) - parseFloat(a.Total);
              } else if (sortByPrice === "lowest") {
                return parseFloat(a.Total) - parseFloat(b.Total);
              }
              return 0;
            })
            .map((ticket) => (
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
                <p className="ticketInfo">
                  Fecha de creación: {ticket.createdAt}
                </p>
                {ticket.createdAt !== ticket.updatedAt && (
                  <p className="ticketInfo">
                    Último cambio: {ticket.updatedAt}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Stats;
