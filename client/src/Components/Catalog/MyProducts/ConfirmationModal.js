import React from "react";
import "./ConfirmationModal.css"; // Estilos del modal

function ConfirmationModal({ isOpen, onClose, onConfirm, question }) {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{question}</h2>
            <div className="modal-buttons">
              <button className="Borrar" onClick={onConfirm}>Borrar</button>
              <button className="Cancelar" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;