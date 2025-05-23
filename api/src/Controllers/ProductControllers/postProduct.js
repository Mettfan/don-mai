const { Op, NUMBER, where } = require("sequelize");
const { Product, User } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");

const postProduct = async (req, res, next) => {

  let { productos, userId } = req.body
  console.log(userId);
  console.log(productos);
  let found = null
  try{
    if (productos.length !== 1){
      
      productos.map( async producto => {
        found = await Product.findOne({where: {
          [Op.or]: [
            {['Código']: producto['Código'] || null},
            {['id']: producto?.id || null},
              ]
            }
            
          })
        if (!found){
          if (producto['Código']){
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
          }]]).then( async d => {
            console.log('status: ' + JSON.stringify(d));
            if (Number(userId) && typeof(userId) === 'number'){
              console.log('user detected, associating...');
              let user = await User.findOne({where: {id: Number(userId)}})
              let product = await Product.findOne({where: {
                [Op.and]:[
                  {['Código']: producto['Código']},
                  {['Producto']: producto['Producto']}
                ]
              }})
              await user.addProduct(product).then(async (result) => {
                console.log(result);
                
                const ticket = await createRegisterTicket({
                  userId,
                  description: `Producto creado: ${product['Producto']}`,
                  productId: product.id,
                });
              }).catch((err) => {
                console.log(err);
              });
            }
            // Product.findAll().then( (d2) => {
            //   console.log(d2,  ' <-database');
            //   res.status(200).send({productos: productos, db: d2})
            // })
      
          })
        }
        }
      } )
    }
    else{
      await Product.create(productos[0]).then(async (response) => {
        console.log(response.id);
        if(JSON.parse(userId)){
          
          console.log('user detected... : ' + JSON.parse(userId));
          let user = await User.findOne({where: {id: JSON.parse(userId)}})
          console.log(user.name);
          let product = await Product.findOne({where: {id: response.id}})  
          console.log(product.Producto);
          await user.addProduct(product).then(async (result) => {
            console.log(result)
            const ticket = await createRegisterTicket({
              userId,
              description: `Producto creado: ${product['Producto']} por el usuario con Id: ${userId}`,
              productId: product.id,
            });
            const updatedUser = await User.findOne({
              where: { id: user.id },
              include: Product,
            });
            console.log("Usuario actualizado con productos:", updatedUser);
          })
        }
        else{
          res.send(response)

        }
      })
    }
    // console.log(JSON.stringify(productos) );
  }
  catch(error){
    res.send({error: error.error})
  }
 
};

module.exports = postProduct;
