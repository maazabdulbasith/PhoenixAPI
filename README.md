# IMF Gadget API

A RESTful API for managing IMF gadgets with authentication and special features.

## Features

- **Gadget Management**
  - Create, read, update, and delete gadgets
  - Random Valorant agent-based codenames
  - Success probability calculation
  - Status tracking (Available, Deployed, Destroyed, Decommissioned)
  - Soft delete functionality
  - Self-destruct sequence with confirmation code

- **Authentication**
  - JWT-based authentication
  - User registration and login
  - Protected routes

- **API Documentation**
  - Swagger/OpenAPI integration
  - Interactive testing interface
  - Detailed endpoint documentation

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Swagger/OpenAPI

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PhoenixAPI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=imf_gadgets
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the server:
```bash
npm start
```

## API Documentation

Once the server is running, you can access the API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Gadgets
- `GET /gadgets` - Get all gadgets (with optional status filter)
- `POST /gadgets` - Create a new gadget
- `PATCH /gadgets/:id` - Update a gadget
- `DELETE /gadgets/:id` - Decommission a gadget
- `POST /gadgets/:id/self-destruct` - Trigger self-destruct sequence
