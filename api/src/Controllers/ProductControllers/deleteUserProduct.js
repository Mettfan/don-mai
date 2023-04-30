const { Product, User } = require("../../db.js");



const deleteUserProduct = async (req, res, next) => {
    let {userId, productId} = req.query
    let user = await User.findOne({where: {id: userId}})
    let product = await Product.findOne({where: {id: productId}})
    await user.removeProduct(product).then((result) => {
        console.log(userId, productId);
        res.send({result})
        
    }).catch((err) => {
        console.log(err);
        res.send({err})
        
    });
};

module.exports = deleteUserProduct;
