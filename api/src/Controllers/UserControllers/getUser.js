const { User } = require("../../db.js");

const getUser = async (req, res, next) => {
  let { filter, value, password } = req.query;

  console.log(req.query);
  let respuesta = null;

  if (filter) {
    User.findOne({ where: { [filter]: value } })
      .then((user) => {
        respuesta = user;
        if (respuesta !== null) {
          if (password === user.password) {
            res.status(200).send(user);
            console.log(user);
          } else {
            res.status(401).json({ error: "Contraseña Incorrecta" });
          }
        } else {
          res.status(404).json({ error: "No existe el Usuario" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
      });
  } else {
    User.findAll()
      .then((users) => {
        console.log(users);
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
      });
  }
};

module.exports = getUser;
