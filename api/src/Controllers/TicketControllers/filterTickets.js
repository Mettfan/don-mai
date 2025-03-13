const { Ticket } = require("../../db.js");

const filterTickets = async (req, res, next) => {
  const { filter, value } = req.query;

  console.log(req.query);
  let respuesta = null;

  if (filter && value) {
    try {
      const tickets = await Ticket.findAll({ where: { [filter]: value } });
      if (tickets.length > 0) {
        res.send(tickets);
      } else {
        res.status(404).send({ message: "No hay Tickets con esos parámetros" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Ocurrió un error al buscar los tickets" });
    }
  } else {
    try {
      const tickets = await Ticket.findAll();
      res.send(tickets);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "Ocurrió un error al obtener los tickets" });
    }
  }
};

module.exports = filterTickets;