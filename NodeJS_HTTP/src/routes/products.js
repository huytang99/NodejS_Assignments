const router = require('../router');
const productController = require('../controllers/productController');

// GET /api/products - Get all products (with optional search)
router.get('/api/products', productController.getAllProducts);

// GET /api/products/:id - Get a specific product
router.get('/api/products/:id', productController.getProductById);

// POST /api/products - Create a new product
router.post('/api/products', productController.createProduct);

// PUT /api/products/:id - Update a product
router.put('/api/products/:id', productController.updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/api/products/:id', productController.deleteProduct);

// PUT /api/products/:id/stock - Update product stock (using PUT instead of PATCH)
router.put('/api/products/:id/stock', productController.updateStock);

module.exports = router; 