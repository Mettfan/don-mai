const { Product, User, Sucursal } = require("../../db.js");



const postSucursal = async (req, res, next) => {

  let { sucursal, userId } = req.body
  try{
    console.log(sucursal);
    // console.log(JSON.stringify(productos) );
    let user = await User.findOne({where: {id: userId }})
    if (user && sucursal){
      await Sucursal.create(sucursal).then( async d => {
          console.log(d);
        console.log('status: ' + JSON.stringify(d));
        await Sucursal.findOne({where: {name: sucursal.name}}).then( async (createdSucursal) => {
          if(createdSucursal?.id){
            await createdSucursal.setUser(user).then((response) => {
              console.log(response);
              res.status(200).send({sucursal: createdSucursal, associationResponse: response})
            })
          }
        })
  
      })
    }
    else{
      res.send('No tienes los permisos necesarios')
    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postSucursal;
