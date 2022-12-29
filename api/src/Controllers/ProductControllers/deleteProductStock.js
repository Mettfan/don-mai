const { Product, User } = require("../../db.js");



const deleteProductStock = async (req, res, next) => {
    let {productBarcode, quantity} = req.body
    console.log(req.body);

    try{
        if(productBarcode !== 'all'){
            console.log('itnotsall');
            // console.log(JSON.stringify(productos) );
            await Product.findOne({where: {['Código']: productBarcode }}).then(async (product) => {
                await Product.update( { 'quantity': 0  }, { where: { ['Código']: product["Código"] }} ).then( result => {
                    console.log(result);
                    res.status(200).send({result: result})
                })
                
            })
            
        }
        else{
            console.log('itsall');
            await Product.findAll().then(async products => {
                await products.forEach(async (product) => {
                    if (product.quantity != '0' || product.quantity != 0){
                        await Product.update({ 'quantity': 0 }, { where: { ['Código']: product["Código"] }} ).then( result => {
                            console.log(result);
                            
                        })

                    }

                }) 
                res.send('EDITED')
                
            })
        }
        
    }
    catch(error){
        res.send({error: error.error})
    }
 
};

module.exports = deleteProductStock;
