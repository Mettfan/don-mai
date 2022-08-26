const { Product, User, Sucursal } = require("../../db.js");



const getSucursal = async (req, res, next) => {

  let { filter, value } = req.query

  console.log(req.query);
  let respuesta = null

  if(filter){
    Sucursal.findOne( {where: { [filter]: value } } ).then( (sucursal) => {
      respuesta = sucursal
      console.log(respuesta);
      res.send(respuesta)
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })
  }
  else{
    Sucursal.findAll().then(sucursal => {
      console.log(sucursal);
      res.send({db: sucursal})
    })
  }

 
};

module.exports = getSucursal;
