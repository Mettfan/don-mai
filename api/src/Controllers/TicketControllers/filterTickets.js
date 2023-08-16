const { Ticket } = require("../../db.js");

const filterTickets = async (req, res, next) => {

    let { filter, value } = req.query

    console.log(req.query);
    let respuesta = null

    if(filter){
        Ticket.findAll( {where: { [filter]: value } } ).then( (tickets) => {
        respuesta = tickets
        if(respuesta !== null){
            res.send(respuesta)

        }
        else{
            res.send({message: 'No hay Tickets con esos parámetros'})
        }
        
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })

  }
  else{
    Ticket.findAll().then(ticket => {
      console.log(ticket);
      res.send(ticket)
    })
  }

 
};

module.exports = filterTickets;
