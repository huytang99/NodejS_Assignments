const querystring = require('querystring');

function bodyParser(req, res, next) {
    if (req.method === 'GET' || req.method === 'DELETE') {
        next();
        return;
    }

    const contentType = req.headers['content-type'] || '';
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            if (contentType.includes('application/json')) {
                req.body = body ? JSON.parse(body) : {};
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                req.body = querystring.parse(body);
            } else if (contentType.includes('multipart/form-data')) {
                // For multipart/form-data, we'll just store the raw body for now
                req.body = { raw: body };
            } else {
                req.body = {};
            }
            next();
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: {
                    code: 400,
                    message: 'Invalid request body'
                }
            }));
        }
    });

    req.on('error', (error) => {
        console.error('Error reading request body:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: {
                code: 400,
                message: 'Error reading request body'
            }
        }));
    });
}

module.exports = bodyParser; 