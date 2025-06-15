# API Documentation

## Endpoints

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

## Authentication
All API endpoints require an API key to be sent in the X-API-Key header.

## Response Format
```json
{
    "success": true,
    "data": {},
    "error": null,
    "meta": {
        "timestamp": "2023-12-01T12:00:00Z",
        "requestId": "uuid"
    }
}
```