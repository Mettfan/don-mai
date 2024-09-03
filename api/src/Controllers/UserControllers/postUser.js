const { User } = require("../../db.js");
const bcrypt = require("bcrypt");

const postUser = async (req, res, next) => {
  let { user } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.bought = 30;

    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = postUser;