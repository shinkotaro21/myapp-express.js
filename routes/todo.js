const express = require('express');
const router = express.Router();
const controller = require('../controller/todos.controllers');

router.get('/getTodo', controller.getTodo);
router.post('/postTodo', controller.postTodo);
router.put('/updateTodo', controller.updateTodo);
router.delete('/deleteTodo', controller.deleteTodo);

module.exports = router;