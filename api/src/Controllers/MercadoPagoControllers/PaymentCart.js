const mercadopago = require("mercadopago");

let token = process.env.MP_TOKEN;
mercadopago.configure({
  access_token: token,
});

const paymentCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    const preference = {
      items: items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
      })),
      back_urls: {
        success: `http://localhost:3001/payment/cart_success?user_id=${userId}`,
        failure: `http://localhost:3000/home`,
        pending: `http://localhost:3000/home`,
      },
    };
    
    const response = await mercadopago.preferences.create(preference);

    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error al crear preferencia del carrito:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al crear la preferencia del carrito.",
      });
    }
  }
};

module.exports = paymentCart;
