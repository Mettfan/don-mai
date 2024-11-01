const mercadopago = require('mercadopago');

// Configura el access token
//Este token es de una cuenta de prueba "APP_USR-8387528273949156-050114-aae811b7d6a6e9c9920c0daac533a5e7-1792400513" MODIFICAR
mercadopago.configure({
  access_token: proccess.env.MP_TOKEN
});

const paymentSuccess = async (req, res) => {
  try {
    const { userId, title, quantity, price } = req.body;
    let preference = {
      items: [
        {
          title: title,
          quantity: quantity,
          unit_price: parseFloat(price),
        }
      ],
      back_urls: {
        success: `http://localhost:3001/payment/success?user_id=${userId}&title=${encodeURIComponent(title)}&quantity=${quantity}`,
        failure: `http://localhost:3000/home`,
        pending: `http://localhost:3000/home`
      },
      auto_return: 'approved',
    };
    
    
    console.log("Preferencia a enviar:", preference);
    

    console.log("Preferencia a enviar:", preference);
    
    // Crea una preferencia de pago con await
    const response = await mercadopago.preferences.create(preference);

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