const { Product, User, UserProducts } = require("../../db.js");



const getUserProduct = async (req, res, next) => {

  let {userId} = req.query
  try {
    let user = await User.findOne({where: {id: userId}})
    await user.getProducts().then(result => {
      res.send(result)
    })

  }
  catch(error){
    res.send(error)
  }


//   let user = await User.findOne({where: {id: userId}})
//   await UserProducts.findAll({where: {['UserId']: userId}}).then(async userProducts => {
//       let products = []
//       await userProducts.forEach(async product => {
//         let found = await Product.findOne({where: {id: product.ProductId}})
//         console.log(found);
//         products.push(found)
//       })
//       return products
      
//     }).then(result => {
//         res.send(result)
        
//   })
//   await user.getProducts().then( result => {
//     res.send(result)
//   })
 
};

module.exports = getUserProduct;
