const express = require('express');
const router = express.Router();
const controller = require('../controller/product.controller')

router.get('/getProducts', controller.getProducts);
router.get('/getProductsSearch/:id', controller.getProductsSearch);
router.post('/postProducts/:id', controller.postProducts);

module.exports = router;