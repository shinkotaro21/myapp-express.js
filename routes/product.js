const express = require('express');
const router = express.Router();
const controller = require('../controller/product.controller')
const middleware = require('../middlewares/auth')

router.get('/getProducts', controller.getProducts);
router.get('/getProductsSearch/:id', middleware.verify, controller.getProductsSearch);
router.post('/postProducts/', middleware.verify, controller.postProducts);

module.exports = router;