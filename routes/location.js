const express = require('express');
const router = express.Router();
const controller = require('../controller/location.controllers');

router.get('/getCities', controller.getCities);
router.get('/getCitiesNameByWordCount', controller.getCitiesNameByWordCount);
router.get('/getProvinceByCityName', controller.getProvinceByCityName);

module.exports = router;