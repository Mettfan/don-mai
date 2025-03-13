import React from "react";
import Modal from "react-modal";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, question }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
      <h2 className="modal-title">Confirmación</h2>
      <p className="modal-question">{question}</p>
      <div className="modal-buttons">
        <button className="confirmButton" onClick={onConfirm}>
          Confirmar
        </button>
        <button className="cancelButton" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;