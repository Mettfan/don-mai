import React, { useState } from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, question, TicketId }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedState, setSelectedState] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedState === "pending") {
      if (customerName.trim() !== "") {
      const creditData = {
        id: TicketId,
        description: selectedState,
        client: customerName,
      };
      onConfirm(creditData);
      setCustomerName("");
    } else {
      console.error("Nombre del cliente vacío");
    }
    } else {
      const creditData = {
        id: TicketId,
        description: selectedState
      }
      onConfirm(creditData);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={onClose}>
                X
              </button>
              <p>Estado del ticket:</p>
               <form onSubmit={handleSubmit}>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="pending">Pendiente</option>
                <option value="out">Salida</option>
                <option value="entry">Entrada</option>
              </select>

            <div className="modalHeader">
              
              
            </div>
{ selectedState === "pending" ? <div>
  <h3>
                <p>{question}</p>
              </h3>
              <p>Nombre del cliente:</p>
              <input
                placeholder="Nombre.."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              </div>
            :  null }
            <div className="modalFooter">
                <button type="submit" className="confirmButton">
                  Confirmar
                </button>
                <button
                  type="button"
                  className="cancelButton"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;
