const { User } = require("../../db.js");

const getUser = async (req, res, next) => {

    let { filter, value, password } = req.query

    console.log(req.query);
    let respuesta = null

    if(filter){
        User.findOne( {where: { [filter]: value } } ).then( (user) => {
        respuesta = user
        if(respuesta !== null){
            if(password === user.password){
                res.send(user)
                console.log(user);
    
            }
            else{
                res.send({error: 'Contraseña Incorrecta'})
            }

        }
        else{
            res.send({message: 'No existe el Usuario'})
        }
        
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })

  }
  else{
    User.findAll().then(users => {
      console.log(users);
      res.send(users)
    })
  }

 
};

module.exports = getUser;
