# Service Marketplace Backend

This is the backend API for the Service Marketplace app, built with Node.js, Express, TypeScript, and MongoDB.

## Features
- User authentication (JWT)
- Service posting and management
- Categories
- Reviews
- Admin management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set your environment variables.
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/models` - Mongoose models
- `src/routes` - Express route handlers
- `src/controllers` - Business logic
- `src/middleware` - Express middleware

## API Endpoints
- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/services` - Service management
- `/api/categories` - Categories
- `/api/reviews` - Reviews
- `/api/admin` - Admin actions

---

MIT License
