import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { downloadExcel } from "../../../Convert/Convert";
function BackupTickets(props) {
  let allTickets = useSelector((state) => state.products.tickets.response);
  let testTickets = [
    {
      1: "722222222",
      2: "722222222",
      3: "722222222",
      4: "722222222",
      5: "722222222",
      description: "out",
      user: "Admin",
      client: "Público",
      createdAt: "2023-03-04T16:48:05.978Z",
    },
    {
      1: "722222222",
      2: "722222222",
      3: "722222222",
      4: "722222222",
      5: "722222222",
      6: "722222222",
      7: "722222222",
      description: "out",
      user: "Admin",
      client: "Público",
      createdAt: "2023-03-04T16:48:05.978Z",
    },
    {
      1: "722222222",
      2: "722222222",
      3: "722222222",
      4: "722222222",
      5: "722222222",
      6: "722222222",
      description: "out",
      user: "Admin",
      client: "Público",
      createdAt: "2023-03-04T16:48:05.978Z",
    },
    {
      1: "722222222",
      description: "out",
      user: "Admin",
      client: "Público",
      createdAt: "2023-03-04T16:48:05.978Z",
    },
    {
      1: "722222222",
      2: "722222222",
      3: "722222222",
      4: "722222222",
      5: "722222222",
      6: "722222222",
      7: "722222222",
      description: "out",
      user: "Admin",
      client: "Público",
      createdAt: "2023-03-04T16:48:05.978Z",
    },
  ];
  
  let [tickets, setTickets] = useState(
    props.tickets || allTickets || testTickets
  );

  useEffect(() => {
    setTickets(convertAllTickets(tickets));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function downloadTickets() {
    sortTickets();
    console.log(tickets);
    downloadExcel(tickets, "test");
  }

  function sortTickets() {
    setTickets(
      tickets.sort((a, b) => Object.keys(b).length - Object.keys(a).length)
    );
  }

  function convertOneTicket(ticket) {
    let ticketConverted = {
      createdAt: ticket["createdAt"],
      user: ticket["user"],
      client: ticket["client"],
      description: ticket["description"],
    };
    // eslint-disable-next-line array-callback-return
    ticket["Productos"]?.map((product, index) => {
      ticketConverted[[String(index)]] = String(
        String(product["quantity"]) + "," + String(product["Código"])
      );
    });
    console.log(ticketConverted);
    return ticketConverted;
  }

  function convertAllTickets(tickets) {
    let convertedTickets = [];
    convertedTickets = tickets?.map((ticket) => {
      return convertOneTicket(ticket);
    });
    console.log(convertedTickets);
    return convertedTickets;
  }

  return (
    <div className="backupTicketsContainer">
      <button className="backupButton" onClick={() => downloadTickets()}>
        BACKUP TICKETS
      </button>
      <div className="ticketsInfo">
        {`Number of tickets: ${allTickets?.length}`}
      </div>
    </div>
  );
}

export default BackupTickets;