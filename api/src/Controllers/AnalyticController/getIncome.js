const { Product, Ticket } = require("../../db.js");
const getIncome = async (req, res, next) => {
  let income = 0;
  try{
      
    await Ticket.findAll().then((tickets) => {
      tickets.map((foundTicket) => {
        income += (foundTicket.description === 'out') ? Number(foundTicket['Total']) : 0
      })  
    })
    res.send({income})

  }
  catch(error){
    res.send({error: error.error})
  }

 
};

module.exports = getIncome;
