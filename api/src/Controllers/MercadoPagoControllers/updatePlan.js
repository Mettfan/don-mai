const axios = require("axios");

const updatePlan = async (req, res) => {
  const userId = req.query.user_id;
  const title = decodeURIComponent(req.query.title); // Decodifica el título para obtener el valor real
  try {
    //   Llama a la API para actualizar la información del usuario
    const updateUserResponse = await axios.put("http://localhost:3001/users", {
      userId: userId,
      newStatus: title,
    });

    res.redirect("http://localhost:3000/profile");
  } catch (error) {
    console.error("Error al verificar el estado del pago:", error);
    res.redirect("http://localhost:3000/profile");
  }
};

module.exports = updatePlan;
