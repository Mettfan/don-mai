import React, { useState } from "react";
import Modal from "react-modal";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import "./CambiarPlan.css";

const Planes = [
  // { id: 1, nombre: "Plan Básico", precio: "10.00" },
  { id: 2, name: "basic" , nombre: "Plan Basico", precio: "20.00" },
  { id: 3, name: "premium" , nombre: "Plan Premium", precio: "30.00" },
];

//PARA QUE FUNCINE EN LA CUENTA REAL, SE CAMBIA EL INITMERCADOPAGO DE AQUI ABAJO
// Y TAMBIEN EN EL BACKEND EN "Checkout.js" SE CAMBIA EL access_token
const CambiarPlan = (userId) => {
  initMercadoPago("APP_USR-041091cb-c047-490d-8fe3-86aff471f4d5", {
    locale: "es-MX",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  const abrirModal = () => {
    setModalVisible(true);
    setPreferenceId(null); // Resetear al abrir el modal
  };

  const createPreference = async (plan) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/pago/create_preference",
        {
          title: plan.name,
          quantity: 1,
          price: plan.precio,
          userId: userId,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error al crear preferencia", error);
    }
  };

  const handleBuy = async (plan) => {
    const id = await createPreference(plan);
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="cambiarPlanContainer">
      <button className="cambiarPlanButton" onClick={abrirModal}>
        Cambiar plan
      </button>
      {modalVisible && (
        <Modal
          isOpen={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          className="modalPlanContent"
          overlayClassName="modalPlanOverlay"
        >
          <button
            onClick={() => setModalVisible(false)}
            className="modalCloseButton"
          >
            X
          </button>
          <h2>Elige tu nuevo plan</h2>
          <div className="planesContainer">
            {Planes.map((plan) => (
              <div key={plan.id} className={`planCard ${plan.estilo}`}>
                <h3>{plan.nombre}</h3>
                <p>Precio: ${plan.precio}</p>
                <button className="payButton" onClick={() => handleBuy(plan)}>
                  Pagar con Mercado Pago
                </button>
              </div>
            ))}
          </div>
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CambiarPlan;