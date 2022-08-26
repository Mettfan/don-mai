const { Product, User, Sucursal } = require("../../db.js");



const postSucursal = async (req, res, next) => {

  let { sucursal } = req.body
  try{
    console.log(sucursal);
    // console.log(JSON.stringify(productos) );
    Sucursal.create(sucursal).then( d => {
        console.log(d);
      console.log('status: ' + JSON.stringify(d));
      Sucursal.findOne({where: {name: sucursal.name}}).then( (d2) => {
        console.log(d2,  ' <-database');
        res.status(200).send({sucursal: sucursal, db: d2})
      })

    })
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postSucursal;
