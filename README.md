# News Aggregator API

A RESTful API that allows users to register, login, set news preferences, and fetch personalized news articles from NewsAPI based on their preferences.

## 📋 Project Overview

This is a Node.js/Express-based news aggregator service that integrates with the NewsAPI to provide personalized news content. Users can register accounts, set their news preferences, and receive curated news articles based on their interests.

### Key Features

- User registration and authentication with JWT tokens
- Secure password hashing with bcrypt
- Personal news preference management
- Integration with NewsAPI for fetching top headlines
- RESTful API design with proper error handling
- MongoDB database integration with Mongoose

## 🛠️ Tech Stack

- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **HTTP Client**: Axios
- **Testing**: TAP testing framework with Supertest
- **Environment Variables**: dotenv

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB database
- NewsAPI key (get one from [newsapi.org](https://newsapi.org))

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator-api-bitorsic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URL=mongodb://localhost:27017/news-aggregator
   JWT_SECRET=your-super-secret-jwt-key
   NEWSAPI_KEY=your-newsapi-key
   ```

4. **Start the server**
   ```bash
   node app.js
   ```

   The server will start on port 3000 by default.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |
| `NEWSAPI_KEY` | API key from NewsAPI.org | Yes |

## 🚀 API Documentation

Base URL: `http://localhost:3000`

### Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### User Endpoints

#### 1. User Registration
**POST** `/users/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "preferences": ["technology", "sports"]
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

**Validation Rules:**
- `name`: Required, 5-100 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters
- `preferences`: Optional array of strings

#### 2. User Login
**POST** `/users/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Successfully logged in",
  "id": "user_id",
  "token": "jwt_token_here"
}
```

#### 3. Get User Preferences
**GET** `/users/preferences`

Retrieve current user's news preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "preferences": ["technology", "sports"]
}
```

#### 4. Update User Preferences
**PUT** `/users/preferences`

Update user's news preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "preferences": ["technology", "health", "business"]
}
```

**Response:**
```json
{
  "message": "Preferences successfully updated"
}
```

### News Endpoints

#### 1. Get Personalized News
**GET** `/news`

Fetch top headlines based on user's preferences from India.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "News fetched successfully",
  "news": {
    "status": "ok",
    "totalResults": 38,
    "articles": [
      {
        "source": {
          "id": "source-id",
          "name": "Source Name"
        },
        "author": "Author Name",
        "title": "Article Title",
        "description": "Article description...",
        "url": "https://example.com/article",
        "urlToImage": "https://example.com/image.jpg",
        "publishedAt": "2025-07-13T10:00:00Z",
        "content": "Article content..."
      }
    ]
  }
}
```

## ⚠️ Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "message": "Error description"
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid credentials or missing token |
| 404 | Not Found - User or resource not found |
| 409 | Conflict - Email already exists |
| 500 | Internal Server Error - Server-side error |
| 503 | Service Unavailable - External service (NewsAPI) unavailable |

## 🧪 Testing

Run the test suite using:

```bash
npm test
```

The tests use TAP framework with Supertest for API endpoint testing.

## 📁 Project Structure

```
├── app.js                 # Main application entry point
├── package.json          # Project dependencies and scripts
├── controllers/          # Route controllers
│   ├── newsController.js # News-related endpoints
│   └── usersController.js# User-related endpoints
├── middleware/           # Express middleware
│   └── verifyToken.js   # JWT verification middleware
├── models/              # Mongoose models
│   └── userModel.js     # User schema definition
├── routes/              # Route definitions
│   ├── newsRoute.js     # News routes
│   └── usersRoute.js    # User routes
└── test/                # Test files
    └── server.test.js   # API endpoint tests
```

## 🔐 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication with 1-hour expiration
- **Input Validation**: Comprehensive validation for all user inputs
- **Email Uniqueness**: Prevents duplicate user accounts
- **Environment Variables**: Sensitive data stored in environment variables

## 🌐 External Dependencies

- **NewsAPI**: Used for fetching news articles from various sources
  - Country: India (IN)
  - Endpoint: Top Headlines
  - Filters: Based on user preferences

## 📝 Notes

- The server runs on port 3000 by default
- News preferences are used as query parameters for NewsAPI
- JWT tokens expire after 1 hour
- All timestamps are stored in UTC
- MongoDB connection is established before starting the server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19930064&assignment_repo_type=AssignmentRepo)
