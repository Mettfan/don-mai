const mercadopago = require('mercadopago');

// Configura el access token
//Este token es de una cuenta de prueba "APP_USR-8387528273949156-050114-aae811b7d6a6e9c9920c0daac533a5e7-1792400513" MODIFICAR
mercadopago.configure({
  access_token: 'APP_USR-8387528273949156-050114-aae811b7d6a6e9c9920c0daac533a5e7-1792400513'
});

const paymentSuccess = async (req, res) => {
  try {
    let {userId} = req.body.userId
    let preference = {
      items: [
        {
          title: req.body.title,
          quantity: req.body.quantity,
          unit_price: parseFloat(req.body.price),
        }
      ],
      back_urls: {
        success: `http://localhost:3001/payment/success?user_id=${userId}&title=${encodeURIComponent(req.body.title)}`,
        failure: `http://localhost:3000/home`,
        pending: `http://localhost:3000/home`
      },
      auto_return: 'approved',
    };
    
    console.log("Preferencia a enviar:", preference);
    
    // Crea una preferencia de pago con await
    const response = await mercadopago.preferences.create(preference);
    console.log("Respuesta de MercadoPago:", response);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error al crear la preferencia de MercadoPago:", error);
    // Verifica si la cabecera ya se envió para evitar el error ERR_HTTP_HEADERS_SENT
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Error al crear la preferencia. Por favor intenta más tarde.'
      });
    }
  }
};

module.exports = paymentSuccess;
