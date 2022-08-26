const { Product, User, Sucursal } = require("../../db.js");



const getUserSucursal = async (req, res, next) => {
    let {userId} = req.query
    let user = await User.findOne({where: {id: userId}})
    let sucursal = await user.getSucursal()
    res.send(sucursal)

 
};

module.exports = getUserSucursal;
