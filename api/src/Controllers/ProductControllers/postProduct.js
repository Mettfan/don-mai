const { Op } = require("sequelize");
const { Product, User } = require("../../db.js");



const postProduct = async (req, res, next) => {

  let { productos } = req.body
  let found = null
  try{
    productos.map( async producto => {
      found = await Product.findOne({where: {
        [Op.or]: [
          {['Código']: producto['Código']},
          {['id']: producto?.id || null},
        ]
      }
      
    })
    if (!found){
      await Product.bulkCreate([...[{
        ['Código']: producto['Código'],
        ['Producto']: producto['Producto'],
        ['P. Venta']: producto['P. Venta'],
        ['Departamento']: producto['Departamento'],
      }]]).then( d => {
        console.log('status: ' + JSON.stringify(d));
        // Product.findAll().then( (d2) => {
        //   console.log(d2,  ' <-database');
        //   res.status(200).send({productos: productos, db: d2})
        // })
  
      })
    }
    else{
      found = null
    }
        
    } )
    // console.log(JSON.stringify(productos) );
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postProduct;
