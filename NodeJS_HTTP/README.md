# Node.js HTTP Server

A comprehensive HTTP server implementation using Node.js built-in modules.

## Features
- Custom router implementation
- Middleware support
- REST API endpoints
- File upload handling
- API key authentication
- JSON data storage

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Documentation
See [docs/API.md](docs/API.md) for detailed API documentation.

## Project Structure
```
/
├── src/                    # Source code
├── data/                   # JSON data files
├── public/                 # Static files
├── certs/                  # SSL certificates
├── docs/                   # Documentation
└── tests/                  # Test files
```

## Development
- Node.js built-in modules only
- No external dependencies for core functionality
- JSON file storage
- Self-signed certificates for HTTPS

## License
ISC