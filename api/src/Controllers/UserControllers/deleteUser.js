const { User } = require("../../db"); // Asegúrate de ajustar la ruta según tu estructura de archivos

const deleteUser = async (req, res) => {
  const { userId } = req.params; // Obtener el ID del usuario desde los parámetros de la URL
  console.log(userId, "HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    await user.destroy();
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { deleteUser };
