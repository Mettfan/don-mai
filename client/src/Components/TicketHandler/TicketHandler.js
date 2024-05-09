import React, { useEffect } from "react";
import Tickets from "./Tickets/Tickets";
import "./TicketHandler.css";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

function TicketHandler() {
  let cookie = new Cookies();
  let user = cookie.get("user");
  let nav = useNavigate();
  let currentURL = window.location;

  useEffect(() => {
    if (String(currentURL.href)?.slice(-1) === "?") {
      nav("/tickets");
    }
  }, [currentURL, nav]);

  return (
    <>
      <div className="ticketFunctions">
        {Number(user?.kyu) >= 9 && (
          <button
            className="goToTicketsStats"
            onClick={() => nav("/tickets/stats")}
          >
            STATS
          </button>
        )}
        <Tickets />
      </div>
    </>
  );
}

export default TicketHandler;