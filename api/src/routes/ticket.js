const express = require("express");
const deleteTicket = require("../Controllers/TicketControllers/deleteProduct");
const router = express.Router();

const getTicket = require("../Controllers/TicketControllers/getTicket");
const getTotalTickets = require("../Controllers/TicketControllers/getTotalTickets");
const postTicket = require("../Controllers/TicketControllers/postTicket");
// const putTicket = require("../Controllers/TicketControllers/putTicket");
// const deleteTicket = require("../Controllers/TicketControllers/deleteTicket");


// router.put("/Tickets/update", putTicket);
router.post("/Ticket/delete", deleteTicket)
router.post("/Tickets/Total", getTotalTickets);
router.post("/Tickets", postTicket);
// router.post("/Tickets/delete", deleteTicket);
router.get("/Tickets", getTicket);



module.exports = router;
