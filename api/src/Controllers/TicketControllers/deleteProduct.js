const { Ticket } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const deleteTicket = async (req, res, next) => {

  let { id, userId } = req.body
console.log(id, userId, 'id y userId');

  try{
    let found = await Ticket.findOne({where: { id: id }})
    if(!found){
        res.send({message: 'No existe el Ticket'})
    }
    else{
      let ticketData = { id: found.id, description: found.description };
        await Ticket.destroy({where: {id: id}}).then(async() => {
          await createRegisterTicket({
            userId,
            description: `El ticket ${ticketData.id} ("${ticketData.description}") ha sido eliminado por el usuario: ${userId}.`,
            ticketId: ticketData.id,
          });
            res.send({message: 'TicketDeleted: '+ id })
        })
    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = deleteTicket;
