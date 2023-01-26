const { Ticket } = require("../../db.js");



const deleteTicket = async (req, res, next) => {

  let { id } = req.body

  try{
    let found = await Ticket.findOne({where: { id: id }})
    if(!found){
        res.send({message: 'No existe el Ticket'})
    }
    else{
        await Ticket.destroy({where: {id: id}}).then(() => {
            res.send({message: 'TicketDeleted: '+ id })
        })
    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = deleteTicket;
