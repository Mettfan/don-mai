const mercadopago = require("mercadopago");

// Configura el access token
let token = process.env.MP_TOKEN;
mercadopago.configure({
  access_token: token,
});

const paymentSuccess = async (req, res) => {
  try {
    const { userId, title, quantity, price } = req.body;
    
    let preference = {};
    if (!title || !quantity || !price) {
    } else {
      preference = {
        items: [
          {
            title: title,
            quantity: quantity,
            unit_price: parseFloat(price),
          },
        ],
        back_urls: {
          success: `http://localhost:3001/payment/success?user_id=${userId}&title=${encodeURIComponent(
            title
          )}&quantity=${quantity}`,
          failure: `http://localhost:3000/home`,
          pending: `http://localhost:3000/home`,
        },
        //auto_return: 'approved',
      };
    }

    const response = await mercadopago.preferences.create(preference);

    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error al crear la preferencia de MercadoPago:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al crear la preferencia. Por favor intenta más tarde.",
      });
    }
  }
};

module.exports = paymentSuccess;