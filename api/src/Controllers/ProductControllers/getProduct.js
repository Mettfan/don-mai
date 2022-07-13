const { Product, User } = require("../../db.js");



const getProduct = async (req, res, next) => {
  let { id } = req.query
  let { productos } = req.body
  if (!id){

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
  }
  else{
    try{

      Product.findOne({where: { id: id }}).then( (result) => {
        res.status(200).send(result)
  
      })
    }
    catch ( error ) {
      res.send({ error: error})
    }
  }
 
};

module.exports = getProduct;
