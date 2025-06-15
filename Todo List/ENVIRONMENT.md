# Environment Setup Guide

This guide will help you set up the development and production environments for the Todo List API.

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB (v4 or higher)
3. npm or yarn
4. Git

## Development Environment

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-list-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/todo-list

# JWT Configuration
JWT_SECRET=your-development-secret-key
JWT_EXPIRES_IN=24h

# Logging
LOG_LEVEL=debug
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on http://localhost:3000 with hot-reloading enabled.

### 5. Run Tests
```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:ci
```

## Production Environment

### 1. Environment Variables
Create a `.env` file with production values:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=mongodb://your-production-mongodb-uri

# JWT Configuration
JWT_SECRET=your-secure-production-secret-key
JWT_EXPIRES_IN=24h

# Logging
LOG_LEVEL=info
```

Important: Use a strong, unique JWT secret in production.

### 2. Security Considerations

1. Set up HTTPS
2. Use a secure MongoDB connection string
3. Implement rate limiting
4. Set up proper CORS configuration
5. Use environment-specific logging levels
6. Keep dependencies updated
7. Monitor application logs

### 3. Start Production Server
```bash
npm start
```

## Testing Environment

For running tests, create a `.env.test` file:

```env
# Server Configuration
PORT=3001
NODE_ENV=test

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/todo-list-test

# JWT Configuration
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h

# Logging
LOG_LEVEL=error
```

## Environment Variables Reference

### Server Configuration
- `PORT`: Server port number (default: 3000)
- `NODE_ENV`: Environment name (development/production/test)

### MongoDB Configuration
- `MONGODB_URI`: MongoDB connection string

### JWT Configuration
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: Token expiration time (e.g., "24h", "7d")

### Logging
- `LOG_LEVEL`: Logging level (debug/info/warn/error)

## Troubleshooting

### Common Issues

1. MongoDB Connection
   - Ensure MongoDB is running
   - Check connection string format
   - Verify network access

2. Port Conflicts
   - Check if port is already in use
   - Change PORT in .env if needed

3. JWT Issues
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper token format in requests

4. Test Failures
   - Ensure test database is accessible
   - Check test environment variables
   - Verify MongoDB is running

## Support

For additional help or issues:
1. Check the README.md
2. Review the API documentation
3. Open an issue in the repository 