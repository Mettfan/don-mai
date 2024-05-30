const { verifyToken } = require("./generateToken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "No autorizado, falta el token" });
    }

    const token = authHeader.split(" ")[1];
    const tokenData = await verifyToken(token);

    if (!tokenData) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    req.user = tokenData; // Adjunta los datos del usuario a la solicitud
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Error en middleware authenticate:", error);
    res.status(500).json({ msg: "Error en autenticación" });
  }
};

module.exports = authenticate;
