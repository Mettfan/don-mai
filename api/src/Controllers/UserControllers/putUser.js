const { User } = require("../../db.js");

const putUser = async (req, res, next) => {
 
    let { editingUser } = req.body
   console.log(editingUser,"EEE");
  
    try{
      // console.log(JSON.stringify(productos) );
      User.update({
        name: editingUser.name,
        email: editingUser.email,
        password: editingUser.password,
        phone: editingUser.phone
      } , { where:  {id : editingUser.id} }).then( result => {
                res.status(200).send({result: result})
    })}
    catch(error){
      console.log(error);
      res.status(400).send({error: error.error})
    }
   
  };


// const putUser = async (req, res, next) => {
// console.log(req.body);
//   let { findBy, infoUpdated, id  } = req.body
//   let key = findBy

//   try{
//     // console.log(JSON.stringify(productos) );
//     User.update( { [key]: infoUpdated }, { where: { id: id }} ).then( result => {
//         res.status(200).send({result: result})
//     })
//   }
//   catch(error){
//     res.send({error: error.error})
//   }
 
// };

module.exports = putUser;
