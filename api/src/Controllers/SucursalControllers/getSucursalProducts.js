const { Product, Sucursal, SucursalProducts } = require("../../db.js");



const getSucursalProducts = async (req, res, next) => {

  let {sucursalId} = req.query
  try{
    let sucursal = await Sucursal.findOne({where: {id: sucursalId}})
    await sucursal.getProducts().then(result => {
      res.send(result)
    })

  }
  catch(error){
    res.send(error)
  }



};

module.exports = getSucursalProducts;
