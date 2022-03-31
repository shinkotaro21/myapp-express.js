const express = require('express');
const router = express.Router();
const controller = require('../controller/product.controller')
const middleware = require('../middlewares/auth').verify

router.get('/getProducts', middleware, controller.getProducts);
router.get('/getProductsSearch/:id', middleware, controller.getProductsSearch);
router.post('/postProducts', middleware, controller.postProducts);

module.exports = router;