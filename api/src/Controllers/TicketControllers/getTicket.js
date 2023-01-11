const { Product, User, Ticket } = require("../../db.js");



const getTicket = async (req, res, next) => {

  // let respuesta = null
  let {id} = req.query
  try{

    if (!id){
      await Ticket.findAll().then((tickets) => {
    
        res.send({response: tickets })
      }) 
    }
    else{
      await Ticket.findOne({where: {id: id}}).then((result) => {
        res.send({response: result})
      })
    }
  }
  catch(error){
    res.send(error)
  }
};

module.exports = getTicket;
