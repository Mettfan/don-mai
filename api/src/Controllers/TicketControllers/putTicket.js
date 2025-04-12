const { Ticket } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const putTicket = async (req, res, next) => {
  let { editingTicket, userId } = req.body;
  console.log(userId, "¿¿¿¿¿");
  
  try {
    if (editingTicket.client) {
      Ticket.update(
        {
          description: editingTicket.description,
          client: editingTicket.client,
        },
        { where: { id: editingTicket.id } }
      ).then(async(result) => {
        await createRegisterTicket({
          userId,
          description: `Ticket modificado (ID: ${editingTicket.id}) por el usuario con ID ${userId}. Cambios: Descripción ➝ "${editingTicket.description}", Cliente ➝ "${editingTicket.client}"`,
          ticketId: editingTicket.id,
        });

        res.status(200).send({ result: result });
      });
    } else {
      Ticket.update(
        {
          description: editingTicket.description,
        },
        { where: { id: editingTicket.id } }
      ).then(async(result) => {
        await createRegisterTicket({
          userId,
          description: `Ticket modificado (ID: ${editingTicket.id}) por el usuario con ID ${userId}. Cambios: Descripción ➝ "${editingTicket.description}"`,
          ticketId: editingTicket.id,
        });

        res.status(200).send({ result: result });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.error });
  }
};

module.exports = putTicket;
