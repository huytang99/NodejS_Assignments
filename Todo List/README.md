# Todo List API

A RESTful API for managing personal todo lists with user authentication.

## Features

- User registration and authentication using JWT
- CRUD operations for todos
- Secure password handling
- Input validation
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-list-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todo-list
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
LOG_LEVEL=debug
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- `POST /auth/login` - Login user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Todos

All todo endpoints require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

- `POST /todos` - Create a new todo
  - Body: `{ "content": "Todo item content" }`

- `GET /todos` - Get all todos for the authenticated user

- `PUT /todos/:id` - Update a todo
  - Body: `{ "content": "Updated content", "completed": true }`

- `DELETE /todos/:id` - Delete a todo

## Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

Error Response:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Development

- Run tests: `npm test`
- Run tests with coverage: `npm run test:ci`
- Start development server: `npm run dev`
- Start production server: `npm start`

## Project Structure

```
todo-list-api/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── tests/              # Test files
├── .env.example        # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## License

ISC 