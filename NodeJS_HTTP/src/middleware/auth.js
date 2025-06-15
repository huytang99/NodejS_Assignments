function auth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'API key required' }));
        return;
    }

    // TODO: Implement proper API key validation
    if (apiKey !== 'test-api-key') {
        res.writeHead(403);
        res.end(JSON.stringify({ error: 'Invalid API key' }));
        return;
    }

    next();
}

module.exports = auth;