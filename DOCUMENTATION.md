# Service Marketplace App Documentation

## Overview
This project is a full-stack service marketplace platform, consisting of a Next.js frontend and a Node.js/Express/MongoDB backend. It allows users to register, log in, post and browse services, leave reviews, and manage their profiles. Admin features are included for managing users and content.

---

## Frontend

### Technologies Used
- **Next.js** (React framework for SSR/SSG)
- **TypeScript** (type safety)
- **Tailwind CSS** (utility-first CSS framework)
- **Shadcn/ui** (UI components)
- **React Context/Providers** (state management)
- **Axios or Fetch** (API requests)

### Main Features
- User registration and login
- JWT-based authentication (with backend)
- Service listing and detail pages
- Category browsing
- Posting new services
- User profile management
- Review submission and display
- Admin dashboard (user/service management)
- Responsive, modern UI

### Structure
- `src/app/` - Next.js app directory (pages, layouts, providers)
- `src/components/` - UI and shared components
- `src/lib/` - Utility functions, types, and mock data

---

## Backend

### Technologies Used
- **Node.js** (runtime)
- **Express** (web framework)
- **TypeScript** (type safety)
- **MongoDB** (database)
- **Mongoose** (ODM for MongoDB)
- **dotenv** (environment variables)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (JWT authentication)

### Main Features
- User authentication (register, login, JWT)
- Service CRUD (create, read, update, delete)
- Category management
- Review system
- User and admin management
- Error handling middleware
- Request validation middleware

### Structure
- `src/models/` - Mongoose models (User, Service, Category, Review)
- `src/controllers/` - Business logic for each resource
- `src/routes/` - Express route handlers for API endpoints
- `src/middleware/` - Authentication, error handling, validation
- `src/index.ts` - App entry point

### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (auth required)
- `PUT /api/services/:id` - Update service (auth required)
- `DELETE /api/services/:id` - Delete service (auth required)
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (auth required)
- `DELETE /api/categories/:id` - Delete category (auth required)
- `GET /api/reviews/service/:serviceId` - Get reviews for a service
- `POST /api/reviews` - Create review (auth required)
- `DELETE /api/reviews/:id` - Delete review (auth required)
- `GET /api/users` - List users (auth required)
- `GET /api/users/:id` - Get user by ID (auth required)
- `DELETE /api/users/:id` - Delete user (auth required)

---

## How to Run

### Backend
1. `cd servicebackend`
2. `npm install`
3. Copy `.env.example` to `.env` and set your variables
4. `npm run dev`

### Frontend
1. `cd service9rib-main`
2. `npm install`
3. `npm run dev`

---

## Notes
- The frontend and backend communicate via RESTful API endpoints.
- JWT tokens are used for authentication and must be included in the `Authorization` header for protected routes.
- The project is modular and can be extended with more features as needed.

---

MIT License
