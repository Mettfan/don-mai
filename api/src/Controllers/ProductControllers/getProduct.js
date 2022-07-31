const { Product, User } = require("../../db.js");



const getProduct = async (req, res, next) => {

  let { filter, value } = req.query



  console.log(req.query);
  let respuesta = null

  if(filter){
    Product.findOne( {where: { [filter]: value } } ).then( (producto) => {
      respuesta = producto
      res.send(respuesta)
    })
    .catch(error => {
      res.send(error)
    })
  }
  else{
    Product.findAll().then(productos => {
      res.send(productos)
    })
  }

 
};

module.exports = getProduct;
