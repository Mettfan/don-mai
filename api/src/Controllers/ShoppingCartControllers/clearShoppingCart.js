const { Ticket } = require('../../db');

const clearShoppingCart = async (req, res) => {
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

        await cartTicket.update({
            Productos: [],
            Total: 0,
        });

        res.json([]);
    } catch (error) {
        console.error(`Error clearing cart for user ${userId}:`, error);
        res.status(500).json({ error: 'Failed to clear shopping cart.' });
    }
};

module.exports = clearShoppingCart;