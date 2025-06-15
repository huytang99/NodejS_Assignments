const http = require('http');
const router = require('./router');
const bodyParser = require('./middleware/bodyParser');

// Import routes
require('./routes/users');
require('./routes/products');

const PORT = process.env.PORT || 3001;

// Create server
const server = http.createServer((req, res) => {
    // Log request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle homepage
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js HTTP Server</title>
            </head>
            <body>
                <h1>Hello World</h1>
                <h2>User Management</h2>
                <form id="userForm" action="/api/users" method="POST">
                    <input type="text" name="name" placeholder="Name" required><br>
                    <input type="email" name="email" placeholder="Email" required><br>
                    <button type="submit">Add User</button>
                </form>
                <h2>Product Management</h2>
                <form id="productForm" action="/api/products" method="POST">
                    <input type="text" name="name" placeholder="Product Name" required><br>
                    <input type="number" name="price" placeholder="Price" required><br>
                    <input type="number" name="stock" placeholder="Stock" required><br>
                    <button type="submit">Add Product</button>
                </form>
            </body>
            </html>
        `);
        return;
    }

    // Parse request body
    bodyParser(req, res, () => {
        // Handle the request using the router
        router.handle(req, res);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Available endpoints:');
    console.log('  GET    /api/users');
    console.log('  GET    /api/users/:id');
    console.log('  POST   /api/users');
    console.log('  PUT    /api/users/:id');
    console.log('  DELETE /api/users/:id');
    console.log('  GET    /api/products');
    console.log('  GET    /api/products/:id');
    console.log('  POST   /api/products');
    console.log('  PUT    /api/products/:id');
    console.log('  DELETE /api/products/:id');
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
    }
});