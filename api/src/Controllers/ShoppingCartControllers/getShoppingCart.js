const { Ticket } = require('../../db'); // Import your Ticket model from db/index.js

const getShoppingCart = async (req, res) => {
    const { userId } = req.params;
    try {        
        let cartTicket = await Ticket.findOne({
            where: {
                user: userId,
                status: 'carrito',
            },
        });

        if (!cartTicket) {
            return res.json([]);
        }

        res.status(200).send(cartTicket.Productos || []);
    } catch (error) {
        console.error(`Error fetching cart for user ${userId}:`, error);
        res.status(500).json({ error: 'Failed to fetch shopping cart.' });
    }
};

module.exports = getShoppingCart;