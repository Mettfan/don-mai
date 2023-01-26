const { Product, Ticket } = require("../../db.js");



const getMostSoldProducts = async (req, res, next) => {

  let { analytic } = req.query
  let mostSoldList = []
  try{
      if(analytic){
        await Ticket.findAll().then( (tickets) => {
            tickets?.filter(element => element.description === 'out').forEach(ticket => {
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
      else{
        res.send('No analytic')
      }

  }
  catch(error){
    res.send({error: error.error})
  }

 
};

module.exports = getMostSoldProducts;
