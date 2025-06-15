const request = require('supertest');
const app = require('../src/app');
const Todo = require('../src/models/todo');
const { createTestUser, getAuthHeader } = require('./helpers');

describe('Todos', () => {
  let authToken;
  let testUser;

  beforeEach(async () => {
    const auth = await createTestUser();
    authToken = auth.token;
    testUser = auth.user;
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        content: 'Test todo item'
      };

      const response = await request(app)
        .post('/todos')
        .set(getAuthHeader(authToken))
        .send(todoData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe(todoData.content);
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.user.toString()).toBe(testUser._id.toString());
    });

    it('should not create todo without authentication', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ content: 'Test todo' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('AUTH_REQUIRED');
    });

    it('should validate todo content', async () => {
      const response = await request(app)
        .post('/todos')
        .set(getAuthHeader(authToken))
        .send({ content: '' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /todos', () => {
    beforeEach(async () => {
      // Create some test todos
      await Todo.create([
        { content: 'Todo 1', user: testUser._id },
        { content: 'Todo 2', user: testUser._id },
        { content: 'Todo 3', user: testUser._id }
      ]);
    });

    it('should get all todos for authenticated user', async () => {
      const response = await request(app)
        .get('/todos')
        .set(getAuthHeader(authToken));

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].user.toString()).toBe(testUser._id.toString());
    });

    it('should not get todos without authentication', async () => {
      const response = await request(app)
        .get('/todos');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('AUTH_REQUIRED');
    });
  });

  describe('PUT /todos/:id', () => {
    let testTodo;

    beforeEach(async () => {
      testTodo = await Todo.create({
        content: 'Test todo',
        user: testUser._id
      });
    });

    it('should update todo', async () => {
      const updates = {
        content: 'Updated todo',
        completed: true
      };

      const response = await request(app)
        .put(`/todos/${testTodo._id}`)
        .set(getAuthHeader(authToken))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe(updates.content);
      expect(response.body.data.completed).toBe(updates.completed);
    });

    it('should not update todo without authentication', async () => {
      const response = await request(app)
        .put(`/todos/${testTodo._id}`)
        .send({ content: 'Updated todo' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('AUTH_REQUIRED');
    });

    it('should not update non-existent todo', async () => {
      const response = await request(app)
        .put('/todos/507f1f77bcf86cd799439011')
        .set(getAuthHeader(authToken))
        .send({ content: 'Updated todo' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('TODO_NOT_FOUND');
    });
  });

  describe('DELETE /todos/:id', () => {
    let testTodo;

    beforeEach(async () => {
      testTodo = await Todo.create({
        content: 'Test todo',
        user: testUser._id
      });
    });

    it('should delete todo', async () => {
      const response = await request(app)
        .delete(`/todos/${testTodo._id}`)
        .set(getAuthHeader(authToken));

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify todo is deleted
      const deletedTodo = await Todo.findById(testTodo._id);
      expect(deletedTodo).toBeNull();
    });

    it('should not delete todo without authentication', async () => {
      const response = await request(app)
        .delete(`/todos/${testTodo._id}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('AUTH_REQUIRED');
    });

    it('should not delete non-existent todo', async () => {
      const response = await request(app)
        .delete('/todos/507f1f77bcf86cd799439011')
        .set(getAuthHeader(authToken));

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('TODO_NOT_FOUND');
    });
  });
}); 