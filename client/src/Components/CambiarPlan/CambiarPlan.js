import React, { useState } from "react";
import Modal from "react-modal";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import "./CambiarPlan.css";

const Planes = [
  // { id: 1, nombre: "Plan Básico", precio: "10.00" },
  { id: 2, name: "basic", nombre: "Plan Basico", precio: "20.00" },
  {
    id: 3,
    name: "premium",
    nombre: "Plan Premium",
    precio: "30.00",
  },
  {
    id: 4,
    name: "extraProducts",
    nombre: "Más Productos",
    precio: "5.00",
  }, // Nuevo plan para más productos
];

//PARA QUE FUNCINE EN LA CUENTA REAL, SE CAMBIA EL INITMERCADOPAGO DE AQUI ABAJO
// Y TAMBIEN EN EL BACKEND EN "Checkout.js" SE CAMBIA EL access_token
const CambiarPlan = (userId) => {
  initMercadoPago("APP_USR-a406c57e-2d86-43bc-948e-aab078ef8fc6", {
    locale: "es-MX",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const abrirModal = () => {
    setModalVisible(true);
    setPreferenceId(null); // Resetear al abrir el modal
  };

  const createPreference = async (plan) => {
    try {
      console.log(parseInt(quantity), "?");
      const response = await axios.post(
        "http://localhost:3001/pago/create_preference",
        {
          title: plan.nombre,
          quantity: plan.name === "extraProducts" ? parseInt(quantity) : 1,
          price: plan.precio,
          userId: userId.userId,  
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
                {plan.name === "extraProducts" ? (
                  <p>Precio: ${plan.precio * quantity}</p>
                ) : (
                  <p>Precio: ${plan.precio}</p>
                )}
                {plan.name === "extraProducts" && (
                  <div>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                )}
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
