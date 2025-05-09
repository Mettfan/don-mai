const { User, Sucursal } = require("../../db");

const removeUserFromSucursal = async (req, res) => {
    try {
        const { adminId, userId } = req.body;

        if (!adminId || !userId) {
            return res.status(400).json({ error: "Los IDs de admin y usuario son obligatorios" });
        }

        // Buscar al administrador
        const admin = await User.findByPk(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Administrador no encontrado" });
        }

        if (admin.privileges !== "admin") {
            return res.status(403).json({ error: "El usuario no tiene permisos de administrador" });
        }

        // Buscar las sucursales administradas por el admin
        const sucursales = await Sucursal.findAll({ where: { UserId: admin.id } });

        if (!sucursales.length) {
            return res.status(403).json({ error: "No administras ninguna sucursal" });
        }

        // Buscar el usuario a eliminar
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        let userRemoved = false;
        let sucursalUpdated = null;

        // Verificar en qué sucursal está el usuario y eliminarlo
        for (const sucursal of sucursales) {
            const userInSucursal = await sucursal.hasUser(user);
            console.log(sucursal, userInSucursal);
            
            if (userInSucursal) {
                await sucursal.removeUser(user);
                userRemoved = true;
                sucursalUpdated = sucursal;
                break; 
            }
        }

        if (!userRemoved) {
            return res.status(400).json({ error: "El usuario no pertenece a ninguna de tus sucursales" });
        }

        // Obtener la sucursal actualizada con los usuarios asociados
        const updatedSucursal = await Sucursal.findByPk(sucursalUpdated.id, {
            include: [
                {
                    model: User
                },
            ],
        });

        res.status(200).send(updatedSucursal);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

module.exports = removeUserFromSucursal;