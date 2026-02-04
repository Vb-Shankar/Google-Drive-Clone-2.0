# Google Drive Clone - Backend

A Node.js/Express backend for a Google Drive clone application with file management, AWS S3 integration, and MongoDB Atlas.

## Features

- **Authentication**
  - User registration with email verification
  - JWT-based authentication
  - Password reset via email
  - Two-step verification workflow

- **File Management**
  - Upload files to AWS S3
  - Create folders
  - Delete files
  - Download files with signed URLs
  - Rename files
  - Track user storage

- **Database**
  - MongoDB Atlas for data persistence
  - User profiles with storage limits
  - File metadata storage

- **Security**
  - Bcrypt password hashing
  - JWT token authentication
  - CORS enabled
  - AWS S3 private bucket storage

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- AWS Account with S3 bucket
- Gmail account (for email service)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/googledrive-backend.git
cd googledrive-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/googledrive
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=googledrive-clone-bucket

FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:5000
PORT=5000
```

## Setup Instructions

### MongoDB Atlas
1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Add it to `.env` as `MONGODB_URI`

### AWS S3
1. Create an S3 bucket
2. Configure bucket as private
3. Create IAM user with S3 permissions
4. Add credentials to `.env`

### Gmail Setup
1. Enable 2-factor authentication on your Gmail
2. Generate an App Password
3. Use the app password in `.env` as `EMAIL_PASS`

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Production

Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/verify-email` - Verify email
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Files
- `POST /files/upload` - Upload file (requires auth)
- `GET /files` - Get user files (requires auth)
- `DELETE /files/:fileId` - Delete file (requires auth)
- `GET /files/download/:fileId` - Download file (requires auth)
- `POST /files/create-folder` - Create folder (requires auth)
- `PUT /files/:fileId` - Rename file (requires auth)

## Project Structure

```
├── config/              # Configuration files (DB, AWS, Email)
├── controllers/         # Request handlers
├── middleware/          # Authentication middleware
├── models/             # Database schemas
├── routes/             # API routes
├── utils/              # Helper functions
├── server.js           # Main server file
└── package.json        # Dependencies
```

## Technology Stack

- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **AWS SDK** - S3 integration
- **Multer** - File upload handling
- **CORS** - Cross-origin requests

## Error Handling

The API returns standard HTTP status codes and JSON error messages:
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## License

This project is open source and available under the MIT License.
