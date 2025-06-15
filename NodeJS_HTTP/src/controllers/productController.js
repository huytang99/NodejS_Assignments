const productModel = require('../models/product');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const { search } = req.query;
            let products;

            if (search) {
                products = await productModel.search(search);
            } else {
                products = await productModel.findAll();
            }

            this.sendResponse(res, 200, { products });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await productModel.findById(id);
            
            if (!product) {
                this.sendError(res, 404, 'Product not found');
                return;
            }

            this.sendResponse(res, 200, { product });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            
            // Basic validation
            if (!productData.name || !productData.price || productData.stock === undefined) {
                this.sendError(res, 400, 'Name, price, and stock are required');
                return;
            }

            const newProduct = await productModel.create(productData);
            this.sendResponse(res, 201, { product: newProduct });
        } catch (error) {
            if (error.message.includes('cannot be negative')) {
                this.sendError(res, 400, error.message);
            } else {
                this.handleError(res, error);
            }
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const productData = req.body;

            // Basic validation
            if (!productData.name && !productData.price && productData.stock === undefined) {
                this.sendError(res, 400, 'At least one field (name, price, or stock) is required');
                return;
            }

            const updatedProduct = await productModel.update(id, productData);
            
            if (!updatedProduct) {
                this.sendError(res, 404, 'Product not found');
                return;
            }

            this.sendResponse(res, 200, { product: updatedProduct });
        } catch (error) {
            if (error.message.includes('cannot be negative')) {
                this.sendError(res, 400, error.message);
            } else {
                this.handleError(res, error);
            }
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const deleted = await productModel.delete(id);
            
            if (!deleted) {
                this.sendError(res, 404, 'Product not found');
                return;
            }

            this.sendResponse(res, 204);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Helper methods
    sendResponse(res, statusCode, data = null) {
        const response = {
            success: true,
            data,
            error: null,
            meta: {
                timestamp: new Date().toISOString()
            }
        };

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    }

    sendError(res, statusCode, message) {
        const response = {
            success: false,
            data: null,
            error: {
                code: statusCode,
                message
            },
            meta: {
                timestamp: new Date().toISOString()
            }
        };

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    }

    handleError(res, error) {
        console.error('Error:', error);
        this.sendError(res, 500, 'Internal server error');
    }
}

module.exports = new ProductController(); 