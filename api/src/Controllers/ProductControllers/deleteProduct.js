const { Product } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const deleteProduct = async (req, res, next) => {

  let { productId, userId } = req.body

  try{
    let found = await Product.findOne({where: { id: productId }})
    if(!found){
        res.send({message: 'No existe el producto'})
    }
    else{
        await Product.destroy({where: {id: productId}}).then(async () => {  
          await createRegisterTicket({
            userId,
            description: `El producto ${found.Producto} (ID: ${found.id}) ha sido eliminado por el usuario: ${userId}.`,
            deletedProduct: found,
          });
            res.send({message: 'productDeleted: '+ productId })
        })
    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = deleteProduct;
