const { Sequelize } = require("sequelize");
const { Product, User } = require("../../db.js");



const putProduct = async (req, res, next) => {

  let { findBy, infoUpdated, id  } = req.body
  let key = findBy
  console.log(findBy);
  console.log(infoUpdated);
  console.log(id);
  console.log(typeof(findBy));
  console.log(typeof(infoUpdated));
  console.log(typeof(id));
  if(!infoUpdated && infoUpdated !== false ){
    res.send('error: no se envio informacion para editar')
  }
  else{
    
    try{
    if(findBy === 'P. Venta' && infoUpdated[0] !== '$' ){
      infoUpdated = `$${infoUpdated}`
      if(infoUpdated.split('.').length !== 2){
        infoUpdated = `${infoUpdated}.00`
      }
    if(key === 'disabled' ){
      infoUpdated = Boolean(infoUpdated)
      await Product.update( { ['disabled']: infoUpdated }, { where: { id: id }} ).then( result => {
        console.log(result);
        res.status(200).send({result: result})
    })
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
