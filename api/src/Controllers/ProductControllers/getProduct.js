const { Product, User } = require("../../db.js");



const getProduct = async (req, res, next) => {

  let { filter, value } = req.query
  if(filter == 'barcode'){
    filter = 'Código'
  }



  console.log(req.query);
  let respuesta = null

  if(filter){
    Product.findOne( {where: { [filter]: value } } ).then( (producto) => {
      respuesta = producto
      console.log(respuesta);
      res.send(respuesta)
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })
  }
  else{
    Product.findAll().then(productos => {
      console.log(productos);
      res.send({db: productos})
    })
  }

 
};

module.exports = getProduct;
