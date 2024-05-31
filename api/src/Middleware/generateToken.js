const jwt = require("jsonwebtoken");

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      permission: user.permission,
    },
    process.env.KEY_TOKEN,
    { expiresIn: "1d" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY_TOKEN);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
