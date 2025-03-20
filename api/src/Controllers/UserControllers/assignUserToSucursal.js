const { User, Sucursal } = require("../../db");

const assignUserToSucursal = async (req, res) => {
  try {
    const { adminId, userId } = req.body;

    if (!adminId || !userId) {
      return res.status(400).json({
        error: "Los IDs del admin y usuario son obligatorios",
      });
    }

    // Buscar el admin
    const admin = await User.findByPk(adminId, {
      include: Sucursal, // Incluir sucursales asociadas
    });

    if (!admin) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    // Obtener la sucursal asociada al admin
    const sucursal = admin.Sucursals?.[0]; // Tomar la primera sucursal del admin

    if (!sucursal) {
      return res.status(404).json({ error: "El admin no tiene una sucursal asignada" });
    }

    // Buscar el usuario a asignar
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Asignar el usuario a la sucursal
    await sucursal.addUser(user);
    const updatedSucursal = await Sucursal.findByPk(sucursal.id, { include: User });

    res.status(200).send(updatedSucursal);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

module.exports = assignUserToSucursal;
