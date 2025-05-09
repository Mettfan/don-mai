const { User, Sucursal } = require("../../db");

const assignSucursalToAdmin = async (req, res) => {
  try {
    const { adminId, sucursalId } = req.body;

    if (!adminId || !sucursalId) {
      return res.status(400).json({
        error: "El ID de usuario y el ID de sucursal son obligatorios",
      });
    }

    // Buscar el usuario
    const user = await User.findByPk(adminId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.privileges !== "admin") {
      return res.status(403).json({ error: "El usuario no es un administrador" });
    }

    // Buscar la sucursal
    const sucursal = await Sucursal.findByPk(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada" });
    }

    // Asignar la sucursal al admin
    await user.addSucursal(sucursal);
    // const updatedSucursal = await Sucursal.findByPk(sucursal.id, {
    //     include: [
    //       {
    //         model: User
    //       },
    //     ],
    //   });
    const updatedUser = await User.findByPk(user.id, {
      include: [
        {
          model: Sucursal
        },
      ],
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

module.exports = assignSucursalToAdmin;
