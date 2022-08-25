const { User } = require("../../db.js");

const postUser = async (req, res, next) => {

  let { user } = req.body
  try{
    // console.log(JSON.stringify(productos) );
    User.create(user).then(state => {
        res.send({state})
    })
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postUser;
