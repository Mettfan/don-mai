const { Product, User } = require("../../db.js");



const putProduct = async (req, res, next) => {

  let { findBy, infoUpdated, id  } = req.body
  let key = findBy
  if(!infoUpdated){
    res.send('error: no se envio informacion para editar')
  }
  else{
    
    try{
    if(findBy === 'P. Venta' && infoUpdated[0] !== '$' ){
      infoUpdated = `$${infoUpdated}`
      if(infoUpdated.split('.').length !== 2){
        infoUpdated = `${infoUpdated}.00`
      }
    }
      // console.log(JSON.stringify(productos) );
      await Product.update( { [key]: infoUpdated }, { where: { id: id }} ).then( result => {
          res.status(200).send({result: result})
      })
    }
    catch(error){
      res.send({error: error.error})
    }
  }
 
};

module.exports = putProduct;
