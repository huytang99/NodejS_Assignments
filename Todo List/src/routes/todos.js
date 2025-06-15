const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo');
const { validate, schemas } = require('../utils/validation');
const auth = require('../middleware/auth');

// All todo routes require authentication
router.use(auth);

// Create new todo
router.post('/', validate(schemas.createTodo), createTodo);

// Get all todos
router.get('/', getTodos);

// Update todo
router.put('/:id', validate(schemas.updateTodo), updateTodo);

// Delete todo
router.delete('/:id', deleteTodo);

module.exports = router; 