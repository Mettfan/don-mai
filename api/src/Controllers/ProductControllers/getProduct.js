const { Product, User } = require("../../db.js");



const getProduct = async (req, res, next) => {

  let { filter, value, userId } = req.query
  try{
    if(filter == 'barcode'){
      filter = 'Código'
    }
    console.log(req.query);
    let respuesta = null
  
    if(filter){
      await Product.findOne( {where: { [filter]: value, UserId: userId } } ).then( (producto) => {
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
      await Product.findAll().then(productos => {
        // console.log(productos);
        res.send({db: productos})
      })
    }

  }
  catch(error){
    res.send({error})
  }

 
};

module.exports = getProduct;
