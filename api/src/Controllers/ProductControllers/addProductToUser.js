const { Product, User } = require("../../db.js");



const addProductToUser = async (req, res, next) => {
    let {productId, userId} = req.body
    console.log(req.body);

    try{
        // console.log(JSON.stringify(productos) );
        let product = await Product.findOne({where: {['id']: productId }})
        console.log(product);
        let user = await User.findOne({where: {['id']: userId }})
        console.log(user);
        await user.addProduct(product).then((result) => {
            res.send({result})
            
        }).catch((err) => {
            console.log(err);
        });
    }
    catch(error){
        res.send({error: error.error})
    }
 
};

module.exports = addProductToUser;
