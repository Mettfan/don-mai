const { Product, User } = require("../../db.js");



const putProduct = async (req, res, next) => {

  let { findBy, infoUpdated, id  } = req.body
  let key = findBy
  try{
    // console.log(JSON.stringify(productos) );
    Product.update( { [key]: infoUpdated }, { where: { id: id }} ).then( result => {
        res.status(200).send({result: result})
    })
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = putProduct;
