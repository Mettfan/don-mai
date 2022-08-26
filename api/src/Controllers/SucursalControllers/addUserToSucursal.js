const { response } = require("express");
const { Product, User, Sucursal } = require("../../db.js");



const addUserToSucursal = async (req, res, next) => {

  let { userId, sucursalId } = req.body

//   console.log(req.query);
  let respuesta = null

  if(sucursalId){
    let sucursal = await Sucursal.findOne( {where: { id: sucursalId}} )
    let user = await User.findOne( {where: {id: userId}} )
    await sucursal.setUser(user).then(response => {
        res.send(response)
    })
    // Sucursal.findOne( {where: { id: sucursalId } } ).then( (sucursal) => {
      
    //   console.log(sucursal);
    //   User.findOne( {where: {id: userId }} ).then((user) => {
    //     console.log(user);
    //     sucursal.addUser(user).then((response) => {
    //         respuesta = response
    //         console.log(respuesta);
    //         res.send(respuesta)

    //     })
    //   })
    // })
    .catch(error => {
      console.log(error);
      res.send(error)
    })
  }
  else{
    Sucursal.findAll().then(sucursal => {
      console.log(sucursal);
      res.send({db: sucursal})
    })
  }

 
};

module.exports = addUserToSucursal;
