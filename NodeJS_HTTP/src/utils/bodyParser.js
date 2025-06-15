const querystring = require('querystring');

class BodyParser {
    static async parse(req) {
        return new Promise((resolve, reject) => {
            const contentType = req.headers['content-type'] || '';
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    if (!body) {
                        resolve({});
                        return;
                    }

                    if (contentType.includes('application/json')) {
                        resolve(JSON.parse(body));
                    } else if (contentType.includes('application/x-www-form-urlencoded')) {
                        resolve(querystring.parse(body));
                    } else if (contentType.includes('multipart/form-data')) {
                        // For multipart/form-data, we'll need to implement proper parsing
                        resolve({ raw: body });
                    } else {
                        // Default to parsing as JSON
                        try {
                            resolve(JSON.parse(body));
                        } catch {
                            // If JSON parsing fails, return raw body
                            resolve({ raw: body });
                        }
                    }
                } catch (error) {
                    reject(new Error('Invalid request body'));
                }
            });

            req.on('error', error => {
                reject(error);
            });
        });
    }
}

module.exports = BodyParser; 