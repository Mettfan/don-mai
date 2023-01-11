const { Product, User, Ticket } = require("../../db.js");



const getTotalTickets = async (req, res, next) => {
    let {id} = req.body
    let total = 0
    try{
        if(!id){
            await Ticket.findAll().then((tickets) => {
                console.log(tickets);
                tickets.forEach((ticket) => {
                    total += ticket.Total
                })
                return total
            }).then((total) => {
                res.send({total})
            })
        }

    }
    catch(error){
        res.send(error)
    }
};

module.exports = getTotalTickets;
