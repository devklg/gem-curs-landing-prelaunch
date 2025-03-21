# Talk Fusion Enrollment System

A full-stack MERN application for managing Talk Fusion pre-enrollment and enrollment processes.

## Features

- User authentication and authorization
- Pre-enrollment system
- Binary tree structure for downline management
- Modern UI with animations
- Responsive design
- Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd talk-fusion-enrollment
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/talk-fusion-enrollment
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Running the Application

1. Start the backend server:
```bash
# From the root directory
npm run dev
```

2. Start the frontend development server:
```bash
# From the client directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile
- GET /api/users/downline - Get user's downline

### Enrollment
- POST /api/enrollment/pre-enroll - Pre-enroll a new user
- POST /api/enrollment/complete - Complete enrollment
- GET /api/enrollment/status/:userId - Get enrollment status

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 