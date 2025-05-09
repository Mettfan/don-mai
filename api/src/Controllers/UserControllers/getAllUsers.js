const { User } = require("../../db.js");

const getAllUsers = async (req, res, next) => {
  const { userId } = req.query;
  const requesterId = userId;

  try {
    // Primero, verifica si el usuario que hace la solicitud es un super usuario
    const requester = await User.findByPk(requesterId);
    if (!requester) {
      return res
        .status(404)
        .json({ error: "Usuario solicitante no encontrado" });
    }
    if (true) {
      // if (requester.privileges === "super") {
      // Si es super usuario, retorna todos los usuarios
      const users = await User.findAll();
      return res.status(200).json(users);
    } else if (filter) {
      // Si no es super usuario, pero se proporciona un filtro, busca por ese filtro
      const user = await User.findOne({ where: { [filter]: value } });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      // Verifica que el usuario no esté intentando acceder a información de un super usuario
      if (user.privileges === "super") {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      return res.status(200).json(user);
    } else {
      // Si no hay filtro, no permitas que usuarios no super accedan a todos los usuarios
      return res.status(403).json({ error: "Acceso denegado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getAllUsers;
