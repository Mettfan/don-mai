const { Product, User } = require("../../db.js");



const getProduct = async (req, res, next) => {

  let { productos } = req.body
  try{
    // console.log(JSON.stringify(productos) );
    Product.findAll().then( d => {
      console.log('status: ' + JSON.stringify(d));
      res.status(200).send({productos: productos, db: d})


    })
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = getProduct;
