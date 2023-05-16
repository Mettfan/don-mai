const { Product, Sucursal } = require("../../db.js");



const deleteSucursalProduct = async (req, res, next) => {
    let {sucursalId, productId} = req.query
    let sucursal = await Sucursal.findOne({where: {id: sucursalId}})
    let product = await Product.findOne({where: {id: productId}})
    await sucursal.removeProduct(product).then(async (result) => {
        console.log(sucursalId, productId);
        let sucursalProducts = await sucursal.getProducts()
        res.send([...sucursalProducts])
        
    }).catch((err) => {
        console.log(err);
        res.send({err})
        
    });
};

module.exports = deleteSucursalProduct;
