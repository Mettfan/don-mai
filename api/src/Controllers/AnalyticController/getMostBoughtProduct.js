const { Product, Ticket } = require("../../db.js");



const getMostBoughtProducts = async (req, res, next) => {

  let mostSoldList = []
  try{
        await Ticket.findAll().then( (tickets) => {
            tickets?.filter(element => element.description === 'entry').forEach(ticket => {
                ticket.Productos.forEach((product) => {
                    let foundObjectIndex = {}
                    foundObjectIndex = mostSoldList.findIndex(object => object.Código === product.Código)
                    if(foundObjectIndex < 0){
                        mostSoldList.push(product)
                    }
                    else{
                        mostSoldList[foundObjectIndex] = {...mostSoldList[foundObjectIndex], quantity: Number(mostSoldList[foundObjectIndex]['quantity']) + Number(product['quantity']) }
                    }
                })
            })
            res.send({products: mostSoldList})
        })
        .catch(error => {
          console.log(error);
          res.send(error)
        })

  }
  catch(error){
    res.send({error: error.error})
  }

 
};

module.exports = getMostBoughtProducts;
