const userModel = require('../models/user');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userModel.findAll();
            this.sendResponse(res, 200, { users });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await userModel.findById(id);
            
            if (!user) {
                this.sendError(res, 404, 'User not found');
                return;
            }

            this.sendResponse(res, 200, { user });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            
            // Basic validation
            if (!userData.name || !userData.email) {
                this.sendError(res, 400, 'Name and email are required');
                return;
            }

            const newUser = await userModel.create(userData);
            this.sendResponse(res, 201, { user: newUser });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const userData = req.body;

            // Basic validation
            if (!userData.name && !userData.email) {
                this.sendError(res, 400, 'At least one field (name or email) is required');
                return;
            }

            const updatedUser = await userModel.update(id, userData);
            
            if (!updatedUser) {
                this.sendError(res, 404, 'User not found');
                return;
            }

            this.sendResponse(res, 200, { user: updatedUser });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const deleted = await userModel.delete(id);
            
            if (!deleted) {
                this.sendError(res, 404, 'User not found');
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

module.exports = new UserController(); 