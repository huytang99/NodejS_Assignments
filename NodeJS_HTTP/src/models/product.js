class Product {
    constructor() {
        // In-memory storage
        this.products = [];
        this.nextId = 1;
    }

    // Get all products
    findAll() {
        return this.products;
    }

    // Find product by ID
    findById(id) {
        return this.products.find(product => product.id === id);
    }

    // Create new product
    create(productData) {
        // Basic validation
        if (!productData.name || !productData.price || productData.stock === undefined) {
            throw new Error('Name, price, and stock are required');
        }

        if (productData.price < 0) {
            throw new Error('Price cannot be negative');
        }

        if (productData.stock < 0) {
            throw new Error('Stock cannot be negative');
        }

        const product = {
            id: this.nextId++,
            name: productData.name,
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock, 10),
            description: productData.description || '',
            createdAt: new Date().toISOString()
        };

        this.products.push(product);
        return product;
    }

    // Update product
    update(id, productData) {
        const product = this.findById(id);
        if (!product) return null;

        if (productData.name) product.name = productData.name;
        if (productData.price !== undefined) {
            if (productData.price < 0) {
                throw new Error('Price cannot be negative');
            }
            product.price = parseFloat(productData.price);
        }
        if (productData.stock !== undefined) {
            if (productData.stock < 0) {
                throw new Error('Stock cannot be negative');
            }
            product.stock = parseInt(productData.stock, 10);
        }
        if (productData.description !== undefined) {
            product.description = productData.description;
        }

        product.updatedAt = new Date().toISOString();
        return product;
    }

    // Delete product
    delete(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) return false;

        this.products.splice(index, 1);
        return true;
    }

    // Update stock
    updateStock(id, quantity) {
        const product = this.findById(id);
        if (!product) return null;

        const newStock = product.stock + quantity;
        if (newStock < 0) {
            throw new Error('Insufficient stock');
        }

        product.stock = newStock;
        product.updatedAt = new Date().toISOString();
        return product;
    }

    // Search products
    search(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
}

module.exports = new Product(); 