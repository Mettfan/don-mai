const { Product, User } = require("../../db.js");



const postProduct = async (req, res, next) => {

  let { productos } = req.body
  try{
    // console.log(JSON.stringify(productos) );
    Product.bulkCreate([...productos]).then( d => {
      console.log('status: ' + JSON.stringify(d));
      Product.findAll().then( (d2) => {
        console.log(d2,  ' <-database');
        res.status(200).send({productos: productos, db: d2})
      })

    })
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postProduct;
