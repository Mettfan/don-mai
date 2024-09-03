import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import {
  fetchFilteredTickets,
  fetchTickets,
} from "../../features/products/productSlicetest";

//PERMISOS LINEA 140

export function Search() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  let cookie = new Cookies();
  let user = cookie.get("user");

  let tickets = useSelector((state) => state.products.tickets.response);
  let userTickets = useSelector((state) => state.products.userTickets);
  console.log(userTickets, user);

  const getAllTickets = useCallback(() => {
    console.log(tickets);
    dispatch(fetchTickets());
  }, [dispatch, tickets]);

  const getUserTickets = useCallback(() => {
    console.log(tickets);
    dispatch(fetchFilteredTickets({ filter: "user", value: user?.name }));
  }, [dispatch, tickets, user?.name]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllTickets(), getUserTickets()]);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  const handleDescriptionFilterChange = (event) => {
    setSelectedDescription(event.target.value);
  };

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const sortTicketsByPrice = (tickets, sortByPrice) => {
    const ticketsCopy = [...tickets];
    return ticketsCopy.sort((a, b) => {
      if (sortByPrice === "highest") {
        return parseFloat(b.Total) - parseFloat(a.Total);
      } else if (sortByPrice === "lowest") {
        return parseFloat(a.Total) - parseFloat(b.Total);
      }
      return 0;
    });
  };

  const sortTicketsByDate = (tickets, sortByDate) => {
    const ticketsCopy = [...tickets];
    return ticketsCopy.sort((a, b) => {
      if (sortByDate === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortByDate === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  const filterTickets = useCallback(
    (ticket) => {
      const normalizedSearchTerm = normalizeText(searchTerm);
      const normalizedDescription = normalizeText(ticket.description);
      const normalizedClient = normalizeText(ticket.client);

      const matchesSearchTerm =
        normalizedDescription.includes(normalizedSearchTerm) ||
        ticket.id.toString().includes(searchTerm) ||
        ticket.Total.toString().includes(searchTerm) ||
        normalizedClient.includes(normalizedSearchTerm) ||
        (ticket.name &&
          normalizeText(ticket.name).includes(normalizedSearchTerm));

      const matchesDescription =
        !selectedDescription ||
        selectedDescription === "all" ||
        normalizedDescription === selectedDescription.toLowerCase();

      const matchesTotal =
        !sortByPrice ||
        (sortByPrice === "highest" &&
          parseFloat(ticket.Total) <=
            Math.max(...tickets.map((t) => parseFloat(t.Total)))) ||
        (sortByPrice === "lowest" &&
          parseFloat(ticket.Total) >=
            Math.min(...tickets.map((t) => parseFloat(t.Total))));

      return matchesSearchTerm && matchesDescription && matchesTotal;
    },
    [searchTerm, selectedDescription, sortByPrice, tickets]
  );

  if (!tickets) {
    return <div>Cargando tickets...</div>;
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  //IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!
  const filteredTickets =
    user?.privileges === "usuario"
      ? tickets.filter((ticket) => new Date(ticket.createdAt) >= oneWeekAgo)
      : tickets;

  const sortedTickets = sortByDate
    ? sortTicketsByDate(filteredTickets, sortByDate)
    : sortTicketsByPrice(filteredTickets, sortByPrice);
  const sortedAndFilteredTickets = sortedTickets?.filter(filterTickets);

  return (
    <>
      <div className="search-header">
        <h1>Buscar Tickets</h1>
      </div>
      <div className="filtros-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Buscar ticket..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="select-container">
          <select value={sortByDate} onChange={handleSortByDateChange}>
            <option value="">Ordenar por fecha</option>
            <option value="newest">Más recientes a más viejos</option>
            <option value="oldest">Más viejos a más recientes</option>
          </select>
        </div>
        <div className="select-container">
          <select value={sortByPrice} onChange={handleSortByPriceChange}>
            <option value="">Ordenar por precio</option>
            <option value="highest">De mayor a menor</option>
            <option value="lowest">De menor a mayor</option>
          </select>
        </div>
        <div className="select-container">
          <select
            value={selectedDescription}
            onChange={handleDescriptionFilterChange}
          >
            <option value="">Filtrar por descripción</option>
            <option value="out">Out</option>
            <option value="pending">Pending</option>
            <option value="entry">Entry</option>
          </select>
        </div>
      </div>
      {user?.privileges === "usuario" ? (
        <p>Para ver todos los tickets debes mejorar tu plan</p>
      ) : null}
      <div className="ticket-list">
        {sortedAndFilteredTickets?.map((ticket) => (
          <div
            className="ticket-card"
            key={ticket.id}
            onClick={() => {
              nav(`/tickets/${ticket.id}`);
            }}
          >
            <p className="ticket-info">
              <strong>Id:</strong> {ticket.id}
            </p>
            <p className="ticket-info">
              <strong>Descripción:</strong> {ticket.description}
            </p>
            <p className="ticket-info">
              <strong>Total:</strong> ${ticket.Total}
            </p>
            <p className="ticket-info">
              <strong>Cliente:</strong> {ticket.client}
            </p>
            <p className="ticket-info">
              <strong>Fecha de creación:</strong> {ticket.createdAt}
            </p>
            {ticket.createdAt !== ticket.updatedAt && (
              <p className="ticket-info">
                <strong>Último cambio:</strong> {ticket.updatedAt}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}