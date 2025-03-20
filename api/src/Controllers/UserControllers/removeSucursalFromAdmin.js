const { User, Sucursal } = require("../../db");

const removeSucursalFromAdmin = async (req, res) => {
    try {
        const { adminId, sucursalId } = req.body;

        if (!adminId || !sucursalId) {
            return res.status(400).json({ error: "El ID del usuario y el ID de la sucursal son obligatorios" });
        }

        // Buscar el usuario (admin)
        const user = await User.findByPk(adminId);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (user.privileges !== "admin") {
            return res.status(403).json({ error: "El usuario no tiene permisos de administrador" });
        }

        // Buscar la sucursal
        const sucursal = await Sucursal.findByPk(sucursalId);

        if (!sucursal) {
            return res.status(404).json({ error: "Sucursal no encontrada" });
        }

        // Eliminar la relación entre la sucursal y el usuario admin
        await user.removeSucursal(sucursal); // Usar removeSucursal en lugar de addSucursal

        // Obtener el usuario actualizado con las sucursales asociadas
        const updatedUser = await User.findByPk(user.id, {
            include: [
                {
                    model: Sucursal,
                },
            ],
        });

        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

module.exports = removeSucursalFromAdmin;