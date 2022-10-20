const { Product } = require("../../db.js");



const deleteProduct = async (req, res, next) => {

  let { id } = req.body

  try{
    let found = await Product.findOne({where: { id: id }})
    if(!found){
        res.send({message: 'No existe el producto'})
    }
    else{
        await Product.destroy({where: {id: id}}).then(() => {
            res.send({message: 'productDeleted: '+ id })
        })
    }
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = deleteProduct;
