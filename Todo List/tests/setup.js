const mongoose = require('mongoose');
require('dotenv').config();

// Connect to test database
beforeAll(async () => {
  const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/todo-list-test';
  await mongoose.connect(TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clear database between tests
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
}); 