const { User } = require("../../db.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../Middleware/generateToken");

const getUser = async (req, res, next) => {
  const { filter, value, password } = req.query;

  if (filter) {
    try {
      const user = await User.findOne({ where: { [filter]: value } });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const token = generateToken(user);
          res.status(200).json({ user, token });
        } else {
          res.status(401).json({ error: "Contraseña Incorrecta" });
        }
      } else {
        res.status(404).json({ error: "No existe el Usuario" });
      }
    } catch (error) {
      console.error("Error en getUser:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error en getUser:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

module.exports = getUser;