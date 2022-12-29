const { Op, where } = require("sequelize");
const { Product, User } = require("../../db.js");



const sellProducts = async (req, res, next) => {

  let { productos } = req.body
  console.log(productos);

  try{
    if(productos){
        productos.map(async producto => {
            let foundProduct = await Product.findOne({where: {['Código']: producto['Código'] }})
            if (foundProduct){
                await Product.update({quantity: Number(foundProduct.quantity) - Number(producto.quantity) }, {where: { ['Código']: foundProduct['Código'] }}).then(result => {
                    console.log(result);
                })
            }
        })
        res.send({productos})

    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = sellProducts;
