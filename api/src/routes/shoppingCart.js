const express = require('express');
const router = express.Router();

const getShoppingCart = require('../Controllers/ShoppingCartControllers/getShoppingCart');
const addProductToShoppingCart = require('../Controllers/ShoppingCartControllers/addProduct');
const removeProductFromShoppingCart = require('../Controllers/ShoppingCartControllers/removeProduct');
const updateProductQuantityInCart = require('../Controllers/ShoppingCartControllers/updateProductQuantity');
const clearShoppingCart = require('../Controllers/ShoppingCartControllers/clearShoppingCart');


router.get('/shoppingCart/:userId', getShoppingCart);
router.post('/shoppingCart/:userId/add', addProductToShoppingCart);
router.put('/shoppingCart/:userId/updateQuantity', updateProductQuantityInCart); 
router.delete('/shoppingCart/:userId/remove/:productId', removeProductFromShoppingCart);
router.delete('/shoppingCart/:userId/clear', clearShoppingCart);

module.exports = router;