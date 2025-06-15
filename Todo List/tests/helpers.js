const jwt = require('jsonwebtoken');
const User = require('../src/models/user');

// Create a test user and return user data and token
const createTestUser = async (email = 'test@example.com', password = 'password123') => {
  const user = new User({ email, password });
  await user.save();

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );

  return {
    user,
    token
  };
};

// Generate auth header with token
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`
});

module.exports = {
  createTestUser,
  getAuthHeader
}; 