const { Product, User } = require("../../db.js");



const getTotalInvested = async (req, res, next) => {
    let total = 0;
    let {investType} = req.query || 'Venta'
    // console.log(investType);
    try{
        await Product.findAll().then((productos => {
            
            productos.forEach( product => {
                // console.log(product['P. Venta']);
                // total = total + 1
                if(product['P. ' + investType] !== null){
                    total = total + ((Number(product.quantity) * (product['P. ' + investType][0] !== '$' ?  Number(product['P. ' + investType]) : Number(product['P. ' + investType].slice(1))) || 0 ) )

                } 
                // console.log(total);
                
            })
        })).then(() => {

            res.send({total: total})
        })
        // console.log(productos);

        // console.log(productos);
        // if(productos){
        //     productos.map(product => {
        //         total = total + (Number(product.quantity) * (product.price[0] !== '$' ?  Number(product.price) : Number(product.price.slice(1))) )
        //     })
        // }
        


 }
 catch(error){
    res.send({error: 'r'})
 }
 
};

module.exports = getTotalInvested;
