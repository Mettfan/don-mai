const express = require("express");
const deleteTicket = require("../Controllers/TicketControllers/deleteProduct");
const router = express.Router();

const getTicket = require("../Controllers/TicketControllers/getTicket");
const getTotalTickets = require("../Controllers/TicketControllers/getTotalTickets");
const postTicket = require("../Controllers/TicketControllers/postTicket");
const filterTickets = require("../Controllers/TicketControllers/filterTickets");
const putTicket = require("../Controllers/TicketControllers/putTicket");
// const putTicket = require("../Controllers/TicketControllers/putTicket");
// const deleteTicket = require("../Controllers/TicketControllers/deleteTicket");


// router.put("/Tickets/update", putTicket);
router.post("/Ticket/delete", deleteTicket)
router.post("/Tickets/Total", getTotalTickets);
router.post("/Tickets", postTicket);
// router.post("/Tickets/delete", deleteTicket);
router.get("/Tickets", getTicket);
router.get("/Tickets/search", filterTickets);
router.put("/Ticket/edit", putTicket);



module.exports = router;
