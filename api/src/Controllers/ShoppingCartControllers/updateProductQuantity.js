const { Ticket } = require('../../db');

const updateProductQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  
  if (!productId || typeof quantity !== 'number' || isNaN(quantity)) {
    return res.status(400).json({ error: 'Invalid product ID or quantity provided.' });
  }

  try {
    let cartTicket = await Ticket.findOne({
      where: {
        user: userId,
        status: 'carrito',
      },
    });

    if (!cartTicket) {
      return res.status(404).json({ error: 'Shopping cart not found for this user.' });
    }

    let productos = [];
    try {
      const rawValue = cartTicket.Productos;
      productos = Array.isArray(rawValue)
        ? [...rawValue]
        : (typeof rawValue === 'string' ? JSON.parse(rawValue) : []);
    } catch (e) {
      console.error('Error parsing Productos:', e);
      productos = [];
    }

    const productIndex = productos.findIndex((item) => item.id == productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart.' });
    }

    if (quantity <= 0) {
      productos.splice(productIndex, 1); // eliminar
    } else {
      productos[productIndex].quantity = quantity; // actualizar
    }

    const newTotal = productos.reduce((sum, item) => {
      const price = parseFloat(item["P. Venta"]) || 0;
      return sum + (price * item.quantity);
    }, 0);

    await Ticket.update(
      {
        Productos: productos,
        Total: newTotal,
      },
      {
        where: { id: cartTicket.id },
      }
    );

    const updatedTicket = await Ticket.findByPk(cartTicket.id);

    const { Productos } = updatedTicket;
    
    res.json(
      Productos
    );

  } catch (error) {
    console.error(`Error updating product quantity for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to update product quantity.' });
  }
};

module.exports = updateProductQuantity;
