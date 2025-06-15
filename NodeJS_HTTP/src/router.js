class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
        };
    }

    // Register a route
    register(method, path, handler) {
        // Convert path parameters to regex pattern
        const pattern = path.replace(/:[^/]+/g, '([^/]+)');
        const regex = new RegExp(`^${pattern}$`);

        this.routes[method][path] = {
            regex,
            handler,
            originalPath: path
        };
    }

    // Handle incoming requests
    handle(req, res) {
        const method = req.method;
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname;

        // Find matching route
        const route = Object.values(this.routes[method]).find(route => {
            return route.regex.test(path);
        });

        if (!route) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: {
                    code: 404,
                    message: 'Not Found'
                }
            }));
            return;
        }

        // Extract route parameters
        const params = {};
        const matches = path.match(route.regex);
        const paramNames = route.originalPath.match(/:[^/]+/g) || [];
        
        paramNames.forEach((param, index) => {
            const paramName = param.slice(1); // Remove the ':' prefix
            params[paramName] = matches[index + 1];
        });

        // Add params to request object
        req.params = params;
        req.query = Object.fromEntries(url.searchParams);

        // Call route handler
        try {
            route.handler(req, res);
        } catch (error) {
            console.error('Route handler error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: {
                    code: 500,
                    message: 'Internal Server Error'
                }
            }));
        }
    }

    // Route registration methods
    get(path, handler) {
        this.register('GET', path, handler);
    }

    post(path, handler) {
        this.register('POST', path, handler);
    }

    put(path, handler) {
        this.register('PUT', path, handler);
    }

    delete(path, handler) {
        this.register('DELETE', path, handler);
    }
}

module.exports = new Router();