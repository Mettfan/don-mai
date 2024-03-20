import React, { useState } from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, question, TicketId }) {
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerName.trim() !== "") {
      const creditData = {
        id: TicketId,
        description: "PENDING",
        client: customerName,
      };
      onConfirm(creditData);
      setCustomerName("")
    } else {
      console.error("Nombre del cliente vacío");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalHeader">
              <h3>
                <p>{question}</p>
              </h3>
              <button className="closeButton" onClick={onClose}>
                X
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <p>Nombre del cliente:</p>
              <input
                placeholder="Nombre.."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

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
