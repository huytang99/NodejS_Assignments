const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
todoSchema.index({ user: 1, createdAt: -1 });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo; 