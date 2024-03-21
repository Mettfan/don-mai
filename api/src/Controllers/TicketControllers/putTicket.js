const { Ticket } = require("../../db.js");

const putTicket= async (req, res, next) => {
  let { editingTicket } = req.body;
  try {
    Ticket.update(
      {
        description: editingTicket.description,
        client:  editingTicket.client
      },
      { where: { id: editingTicket.id } }
    ).then((result) => {
      res.status(200).send({ result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.error });
  }
};

module.exports = putTicket;
