const { Op } = require("sequelize");
const { Product, User } = require("../../db.js");



const postProduct = async (req, res, next) => {

  let { productos } = req.body
  let found = null
  try{
    productos.map( async producto => {
      found = await Product.findOne({where: {
        [Op.or]: [
          {['Código']: producto['Código'] || null},
          {['id']: producto?.id || null},
        ]
      }
      
    })
    if (!found){
      await Product.bulkCreate([...[{
        ['Código']: producto['Código'] || null,
        ['Producto']: producto['Producto'] || null,
        ['P. Venta']: producto['P. Venta'] || null,
        ['P. Compra']: producto['P. Compra'] || null,
        ['updatedAt']: producto['updatedAt'] || null,
        ['createdAt']: producto['createdAt'] || null,
        ['quantity']: producto['quantity'] || 0,
        ['Departamento']: producto['Departamento'] || null,
        ['image']: producto['image'] || null,
        ['sales']: producto['sales'] || 0,
        ['brand']: producto['brand'] || null,
      }]]).then( d => {
        console.log('status: ' + JSON.stringify(d));
        // Product.findAll().then( (d2) => {
        //   console.log(d2,  ' <-database');
        //   res.status(200).send({productos: productos, db: d2})
        // })
  
      })
    }
    else{
      res.send({response: found})
    }
        
    } )
    // console.log(JSON.stringify(productos) );
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postProduct;
