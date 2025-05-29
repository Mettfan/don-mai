const { Ticket } = require("../../db");

const removeProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let cartTicket = await Ticket.findOne({
      where: {
        user: userId,
        status: "carrito",
      },
    });

    if (!cartTicket) {
      return res
        .status(404)
        .json({ error: "Shopping cart not found for this user.", cart: [] });
    }

    let currentProductos = cartTicket.Productos || [];
    const initialLength = currentProductos.length;

    currentProductos = currentProductos.filter(
      (item) => item.id !== parseInt(productId)
    );

    if (currentProductos.length === initialLength) {
      return res
        .status(404)
        .json({
          error: "Product not found in cart, no changes made.",
          cart: currentProductos,
        });
    }

    const newTotal = currentProductos.reduce((sum, item) => {
      const price = parseFloat(
        String(item["P. Venta"]).replace(/[^0-9.-]+/g, "")
      );
      return sum + item.quantity * (isNaN(price) ? 0 : price);
    }, 0);

    await cartTicket.update({
      Productos: currentProductos,
      Total: newTotal,
    });

    res.json(cartTicket.Productos);
  } catch (error) {
    console.error(
      `Error removing product from cart for user ${userId}:`,
      error
    );
    res.status(500).json({ error: "Failed to remove product from cart." });
  }
};

module.exports = removeProduct;
