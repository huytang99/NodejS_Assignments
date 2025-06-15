const Todo = require('../models/todo');

// Create new todo
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user._id
    });

    await todo.save();

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error creating todo',
        code: 'CREATE_TODO_ERROR'
      }
    });
  }
};

// Get all todos for user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error fetching todos',
        code: 'FETCH_TODOS_ERROR'
      }
    });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Todo not found',
          code: 'TODO_NOT_FOUND'
        }
      });
    }

    // Update allowed fields
    const updates = Object.keys(req.body);
    const allowedUpdates = ['content', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid updates',
          code: 'INVALID_UPDATES'
        }
      });
    }

    updates.forEach(update => todo[update] = req.body[update]);
    await todo.save();

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error updating todo',
        code: 'UPDATE_TODO_ERROR'
      }
    });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Todo not found',
          code: 'TODO_NOT_FOUND'
        }
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error deleting todo',
        code: 'DELETE_TODO_ERROR'
      }
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}; 