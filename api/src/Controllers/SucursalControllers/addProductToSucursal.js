const { Product, User, Sucursal } = require("../../db.js");



const addProductToSucursal = async (req, res, next) => {

  let { productId, sucursalId } = req.body

  if(productId && sucursalId){
    let producto = await Product.findOne({where: {id: productId}})
    let sucursal = await Sucursal.findOne({where: {id: sucursalId}})
    
    console.log(producto);
    console.log(sucursal);
    await sucursal.addProduct(producto).then( response => {
        res.send(response)
    })

    

  }
  

 
};

module.exports = addProductToSucursal;
