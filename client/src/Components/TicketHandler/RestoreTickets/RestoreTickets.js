import React from "react";
import BackupTickets from "./BackupTickets/BackupTickets";
import UploadTickets from "./UploadTickets/UploadTickets";
import "./RestoreTickets.css"; // Importa el archivo CSS

function RestoreTickets() {
  return (
    <div className="restoreTicketsContainer">
      <h1 className="restoreTicketsHeader">RESTORE TICKETS</h1>
      <div className="componentContainer">
        <BackupTickets />
      </div>
      <div className="componentContainer">
        <UploadTickets />
      </div>
    </div>
  );
}

export default RestoreTickets;