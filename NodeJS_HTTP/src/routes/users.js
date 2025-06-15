const router = require('../router');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const bodyParser = require('../middleware/bodyParser');
const logger = require('../middleware/logger');

// Register user routes
router.register('GET', '/api/users', userController.getAllUsers.bind(userController), [logger, auth]);
router.register('GET', '/api/users/:id', userController.getUserById.bind(userController), [logger, auth]);
router.register('POST', '/api/users', userController.createUser.bind(userController), [logger, auth, bodyParser]);
router.register('PUT', '/api/users/:id', userController.updateUser.bind(userController), [logger, auth, bodyParser]);
router.register('DELETE', '/api/users/:id', userController.deleteUser.bind(userController), [logger, auth]);

module.exports = router; 