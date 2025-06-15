class User {
    constructor() {
        // In-memory storage
        this.users = [];
        this.nextId = 1;
    }

    // Get all users
    findAll() {
        return this.users;
    }

    // Find user by ID
    findById(id) {
        return this.users.find(user => user.id === id);
    }

    // Create new user
    create(userData) {
        const user = {
            id: this.nextId++,
            name: userData.name,
            email: userData.email,
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        return user;
    }

    // Update user
    update(id, userData) {
        const user = this.findById(id);
        if (!user) return null;

        if (userData.name) user.name = userData.name;
        if (userData.email) user.email = userData.email;
        user.updatedAt = new Date().toISOString();

        return user;
    }

    // Delete user
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return false;

        this.users.splice(index, 1);
        return true;
    }
}

module.exports = new User(); 