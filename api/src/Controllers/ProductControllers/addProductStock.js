const { Product, User } = require("../../db.js");



const addProductStock = async (req, res, next) => {
    let {productBarcode, quantity, id} = req.body
    console.log(req.body);

    try{
        // console.log(JSON.stringify(productos) );
        let product = await Product.findOne({where: {['Código']: productBarcode, id: id }})
        await Product.update( { 'quantity': product['quantity'] + quantity }, { where: { ['Código']: productBarcode, id: id }} ).then( result => {
            console.log(result);
            res.status(200).send({result: result})
        })
    }
    catch(error){
        res.send({error: error.error})
    }
 
};

module.exports = addProductStock;
