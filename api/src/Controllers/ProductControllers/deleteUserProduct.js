const { Product, User } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const deleteUserProduct = async (req, res) => {
  try {
    let { userId, productId } = req.query;
    
    let user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    let product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: "El producto no existe" });
    }

    await user.removeProduct(product);

    await createRegisterTicket({
      userId,
      description: `El producto ${product.name} ha sido eliminado por el usuario: ${userId}.`,
      productId,
    });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error en deleteUserProduct:", err);
    res.status(500).json({ error: "Error al eliminar el producto", details: err.message });
  }
};


module.exports = deleteUserProduct;
