const { Op, DataTypes } = require("sequelize");
const { Product, User, Ticket } = require("../../db.js");
const createRegisterTicket = require("../../Helpers/postRegisterTicket.js");
// const Ticket = require("../../models/Ticket.js");

const postTicket = async (req, res, next) => {

  let { products, total, user, client, description, createdAt, status } = req.body
  console.log({ products, total, user, client, description, createdAt, status });
  try{
    await User.findOne({where: {email: user}}).then(async (user) => {
      console.log(user);
      if(user && products){
        await Ticket.create({user: user.name, 
          Productos: products, 
          Total: Number(total), 
          description: description, 
          client: client || 'Público',
          status: status,
        },
        createdAt  
          ).then(async (response) => {
            console.log("Ticket creado:", response.toJSON());
          let ticket = await Ticket.findOne({where: {id: response?.id}})
          let userFound = await User.findOne({where: {email: user?.email} })
          if(ticket){

            await userFound.addTicket(ticket).then(async(result) => {
              console.log(result);
              const registerTicket = await createRegisterTicket({
                userId: userFound.id,
                description: `Se ha creado un nuevo ticket con id ${ticket.id} para el usuario: ${userFound.id} - ${userFound.name}.`,
                ticketId: ticket.id,
                productId: products.id ? products.id : null, 
              });
          
              console.log("Ticket de registro creado:", registerTicket);
              res.send(result)        
            })
          }
        })
      }
      else{
        res.send('no found')
      }
    })
  }
  catch(error){
    res.send(error)
  }
  // try{
  //   await User.findOne({where: {email: user}}).then(async (user) => {
  //     if(!products || !total || !user){
  //       console.log(products, total, user, client, description  );
  //       res.send({error: 'No enough Data'})
  //     }
  //     else{
  //       console.log('bulkeado');
  //       await Ticket.bulkCreate([{user: user.name, Productos: products, Total: Number(total), description: description, client: client || 'Público'}]).then((response) => {
  //         res.send({response: response})
  //       })
  
  //     }
  //   })
  // }
  // catch(error){
  //   res.send({error: error.error})
  // }
};

module.exports = postTicket;
