const axios = require("axios");

const updatePlan = async (req, res) => {
  const userId = req.query.user_id;
  const title = decodeURIComponent(req.query.title); // Decodifica el título para obtener el valor real

  try {
    // Determina la cantidad de productos que se deben sumar según el plan
    let additionalProducts = 0;
    if (title === "Plan Basico") {
      additionalProducts = 30;
    } else if (title === "Plan Premium") {
      additionalProducts = 1000;
    } else if (title === "Más Productos") {
      additionalProducts = parseInt(req.query.quantity, 10); // Asegúrate de pasar la cantidad en la query
    }

    console.log(title, "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
    // Llama a la API para actualizar la información del usuario
    const updateUserResponse = await axios.put("http://localhost:3001/users", {
      userId: userId,
      additionalProducts: additionalProducts,
      newStatus: title === "Más Productos" ? null : title
    });

    res.redirect("http://localhost:3000/profile");
  } catch (error) {
    console.error("Error al verificar el estado del pago:", error);
    res.redirect("http://localhost:3000/profile");
  }
};

module.exports = updatePlan;