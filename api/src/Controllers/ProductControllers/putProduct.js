const { Product, User } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const putProduct = async (req, res, next) => {
  let { findBy, infoUpdated, id, userId } = req.body;
  let key = findBy;

  console.log(findBy, infoUpdated, id);
  console.log(typeof findBy, typeof infoUpdated, typeof id);

  if (!infoUpdated && infoUpdated !== false) {
    return res.status(400).send({ error: "No se envió información para editar" });
  }

  try {
    let productBeforeUpdate = await Product.findByPk(id); // Obtener producto antes de modificarlo

    if (!productBeforeUpdate) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }

    // Formatear precio si se edita "P. Venta"
    if (findBy === "P. Venta" && typeof infoUpdated === "string" && !infoUpdated.startsWith("$")) {
      infoUpdated = `$${infoUpdated}`;
      if (!infoUpdated.includes(".")) {
        infoUpdated = `${infoUpdated}.00`;
      }
    }

    if (key === "disabled") {
      infoUpdated = Boolean(infoUpdated);
    }

    const [updatedRows] = await Product.update({ [key]: infoUpdated }, { where: { id } });

    if (updatedRows === 0) {
      return res.status(400).send({ error: "No se pudo actualizar el producto" });
    }

    const productAfterUpdate = await Product.findByPk(id); // Obtener producto después de actualizar

    // Crear un ticket de registro de la modificación
    if (productBeforeUpdate && productAfterUpdate) {
      await createRegisterTicket({
        userId,
        description: `Producto modificado: ${productAfterUpdate.Producto} (ID: ${id}) por el usuario con Id: ${userId} | ${key}: "${productBeforeUpdate[key]}" ➝ "${infoUpdated}"`,
        productId: id,
      });
    }

    res.status(200).send({ message: "Producto actualizado correctamente", updatedRows });
  } catch (error) {
    console.error("Error actualizando el producto:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
};

module.exports = putProduct;
