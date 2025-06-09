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
git clone https://github.com/maazabdulbasith/PhoenixAPI.git
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

## 🚀 Live Deployment

Watch PhoenixAPI live on my Render link: [https://phoenixapi.onrender.com](https://phoenixapi.onrender.com)

The API is deployed on Render and uses a cloud-hosted PostgreSQL database.

### Quick Test
Visit the root URL to see the welcome message:
```
GET https://phoenixapi.onrender.com/
Response: {"message": "Welcome to the IMF Gadget API"}
```

### API Documentation (Live)
Interactive API documentation is available at:
```
https://phoenixapi.onrender.com/api-docs
```

## 🔧 Development vs Production

### Local Development
- Uses local PostgreSQL database
- Configuration in `.env` file
- For development and testing on your PC

### Production (Render)
- Uses cloud-hosted PostgreSQL database
- Configuration in Render environment variables
- Live, deployed version of the app
- No connection to local development environment

## 🔐 Security Notes

- The production database is completely separate from the development database
- All sensitive information is stored in environment variables
- JWT tokens are used for authentication
- Database credentials are never exposed in the code

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For any questions or issues, please open an issue in the GitHub repository.
