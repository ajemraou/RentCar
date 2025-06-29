# RentCar
# RentCar - Car Rental Management System 🚗

A RESTful API for car rental management built with Node.js, Express, and MongoDB. This system provides complete functionality for managing car rentals, user authentication, and reservations.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Admin role-based access control
  - Password hashing with bcrypt

- **Car Management**
  - Add, update, and delete cars (Admin only)
  - View all cars and available cars
  - Car details with pricing and descriptions
  - Image URL support for car photos

- **Reservation System**
  - Create and manage reservations
  - Date-based availability checking
  - User-specific reservation history
  - Email notifications for reservations

- **Security Features**
  - Helmet.js for security headers
  - CORS configuration
  - Input validation and sanitization
  - Error handling middleware

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, bcryptjs, CORS
- **Email**: Nodemailer
- **Development**: Nodemon for hot reload
- **Logging**: Morgan

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RentCar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/rentcar
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # Email Configuration (for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | User login | Public |

### Car Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/cars` | Get all cars | Public |
| GET | `/cars/available` | Get available cars | Public |
| GET | `/cars/:id` | Get car by ID | Public |
| POST | `/cars` | Create new car | Admin |
| PUT | `/cars/:id` | Update car | Admin |
| DELETE | `/cars/:id` | Delete car | Admin |

### Reservation Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/reservations` | Get user reservations | Authenticated |
| POST | `/reservations` | Create reservation | Authenticated |
| GET | `/reservations/:id` | Get reservation by ID | Authenticated |
| PUT | `/reservations/:id` | Update reservation | Authenticated |
| DELETE | `/reservations/:id` | Cancel reservation | Authenticated |

### Request Examples

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Car (Admin)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Toyota Camry",
    "model": "2023",
    "price": 50,
    "description": "Comfortable sedan perfect for city driving"
  }'
```

## 🏗️ Project Structure

```
RentCar/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── carController.js      # Car management logic
│   └── reservationController.js # Reservation logic
├── middleware/
│   ├── adminAuth.js          # Admin authorization
│   └── errorHandler.js       # Error handling
├── models/
│   ├── Car.js               # Car model schema
│   ├── Reservation.js       # Reservation model schema
│   └── User.js              # User model schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── carRoutes.js         # Car routes
│   └── reservationRoutes.js # Reservation routes
├── services/
│   └── emailService.js      # Email notification service
├── utils/
│   └── dateUtils.js         # Date utility functions
├── server.js                # Application entry point
└── package.json             # Project dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Application environment | Yes |
| `PORT` | Server port | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 30d) |
| `EMAIL_HOST` | SMTP host for emails | No |
| `EMAIL_PORT` | SMTP port | No |
| `EMAIL_USER` | Email username | No |
| `EMAIL_PASS` | Email password | No |

## 🧪 Testing

To test the API endpoints, you can use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [curl](https://curl.se/)

## 🚀 Deployment

### Using PM2 (Recommended for production)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application:
   ```bash
   pm2 start server.js --name "rentcar-api"
   ```

### Using Docker

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t rentcar-api .
   docker run -p 5000:5000 --env-file .env rentcar-api
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions or support, please contact:
- Email: ayoubjemraoui@gmail.com
- GitHub: [ajemraou](https://github.com/ajemraou)

## 🙏 Acknowledgments

- Express.js team for the fantastic framework
- MongoDB team for the database solution
- All contributors and the open-source community

---

**Happy Coding! 🚗💨**