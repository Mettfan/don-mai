const { Ticket } = require("../../db");

const addProduct = async (req, res) => {
  const { userId } = req.params;
  const productPayload = req.body;

  if (
    !productPayload?.id ||
    !productPayload?.Producto ||
    productPayload["P. Venta"] === undefined
  ) {
    return res.status(400).json({
      error: "Datos de producto inválidos. Faltan: id, Producto o P. Venta",
    });
  }

  try {
    // 1. Buscar o crear el carrito
    let [cartTicket, created] = await Ticket.findOrCreate({
      where: { user: userId, status: "carrito" },
      defaults: {
        Productos: [],
        Total: 0,
      },
    });

    // 2. Asegurar que Productos sea un array
    let productos = [];
    try {
      const rawValue = cartTicket.Productos;
      productos = Array.isArray(rawValue)
        ? [...rawValue]
        : typeof rawValue === "string"
        ? JSON.parse(rawValue)
        : [];
    } catch (e) {
      console.error("Error parsing Productos:", e);
      productos = [];
    }

    // 3. Buscar producto existente (comparación flexible con ==)
    const productIndex = productos.findIndex((p) => p.id == productPayload.id);

    // 4. Actualizar o agregar producto
    if (productIndex >= 0) {
      productos[productIndex].quantity += 1;
    } else {
      productos.push({
        ...productPayload,
        quantity: 1,
      });
    }

    // 5. Calcular nuevo total
    const newTotal = productos.reduce((total, item) => {
      const price = parseFloat(item["P. Venta"]) || 0;
      return total + price * item.quantity;
    }, 0);

    // 6. Actualizar el ticket
    await Ticket.update(
      {
        Productos: productos,
        Total: newTotal,
      },
      {
        where: { id: cartTicket.id },
      }
    );

    // 7. Obtener el ticket actualizado
    const updatedTicket = await Ticket.findByPk(cartTicket.id);

    // 8. Devolver respuesta
    const { Productos } = updatedTicket;

    res.json(Productos);
  } catch (error) {
    console.error(`Error en addProduct (user ${userId}):`, error);
    res.status(500).json({
      error: "Error al actualizar el carrito",
      details: error.message,
    });
  }
};

module.exports = addProduct;
