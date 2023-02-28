const { Product, Ticket } = require("../../db.js");
const getOutcome = async (req, res, next) => {
  let outcome = 0;
  try{
      
    await Ticket.findAll().then((tickets) => {
      tickets.map((foundTicket) => {
        outcome += (foundTicket.description === 'entry') ? Number(foundTicket['Total']) : 0
      })  
    })
    res.send({outcome})

  }
  catch(error){
    res.send({error: error.error})
  }

 
};

module.exports = getOutcome;
