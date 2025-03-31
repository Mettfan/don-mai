const { Product, User, Ticket } = require("../db.js");

const createRegisterTicket = async ({ userId, description, productId, ticketId }) => {
    try {   
        let user = await User.findByPk(userId);
        if (!user) throw new Error("Usuario no encontrado");

        let affectedItem = null;
        let itemType = "";
        let totalPrice = 0;

        if (productId) {
            affectedItem = await Product.findByPk(productId);
            itemType = "Producto";
            if (!affectedItem) throw new Error(`${itemType} no encontrado`);

            totalPrice = affectedItem?.['P. Venta'] 
                ? parseFloat(affectedItem['P. Venta'].replace(/[^0-9.]/g, "")) 
                : 0;
        }

        const registerTicket = await Ticket.create({
            user: user.name,
            Productos: productId ? [{ id: affectedItem.id, name: affectedItem.Producto }] : [],
            Total: totalPrice, 
            description: description || "",
            client: "Sistema",
        });

        await user.addTicket(registerTicket);
        console.log("Ticket de registro creado:", registerTicket.toJSON());

        return registerTicket;
    } catch (error) {
        console.error("Error creando el registerTicket:", error.message);
        throw error;
    }
};

module.exports = createRegisterTicket;
