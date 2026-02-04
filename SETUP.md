# Google Drive Clone - Setup & Installation Guide

## ✅ Installation Status

### Frontend
- ✅ Dependencies installed successfully
- ✅ All React and build tools ready
- ✅ Tailwind CSS configured

### Backend
- ✅ Dependencies installed successfully
- ✅ Node.js modules configured
- ⚠️ Note: Multer has some vulnerabilities (known issue, not critical)

## 🚀 Quick Start

### 1. Configure Environment Variables

#### Frontend Setup
```bash
cd googledrive-frontend
```
Create `.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Google Drive Clone
```

#### Backend Setup
```bash
cd googledrive-backend
```
Create `.env` file with:
```
# MongoDB (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/googledrive

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars_recommended
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=googledrive-clone-bucket

# URLs
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:5000
PORT=5000
```

### 2. Start Development Servers

**Terminal 1 - Backend (Port 5000):**
```bash
cd googledrive-backend
npm run dev
```

**Terminal 2 - Frontend (Port 3000):**
```bash
cd googledrive-frontend
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## 📋 Project Structure

```
Google-Drive-Clone-2.0/
├── googledrive-frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   ├── context/         # React Context
│   │   ├── utils/           # Utilities
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── googledrive-backend/
    ├── config/              # Database, AWS, Email
    ├── controllers/         # Business logic
    ├── middleware/          # Auth, error handling
    ├── models/             # User, File schemas
    ├── routes/             # API routes
    ├── utils/              # Helpers
    ├── server.js           # Main server
    ├── package.json
    └── README.md
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
```

## 📚 API Endpoints

### Authentication
```
POST   /auth/register         - Register user
POST   /auth/login            - Login user
POST   /auth/verify-email     - Verify email
POST   /auth/forgot-password  - Request password reset
POST   /auth/reset-password   - Reset password
```

### Files (All require JWT token)
```
POST   /files/upload          - Upload file
GET    /files                 - List files
DELETE /files/:fileId         - Delete file
GET    /files/download/:fileId - Download file
POST   /files/create-folder   - Create folder
PUT    /files/:fileId         - Rename file
```

## 🔒 Security Configuration

### AWS S3 Bucket Setup
1. Create S3 bucket
2. Block all public access
3. Create IAM user with S3 permissions
4. Generate access keys
5. Add keys to `.env`

### MongoDB Atlas Security
1. Create cluster
2. Enable authentication
3. Whitelist your IP
4. Create database user
5. Get connection string for `.env`

### Gmail App Password
1. Enable 2-factor authentication
2. Generate app password
3. Use generated password in `.env`

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000 or 5000
netstat -ano | findstr :<port>
taskkill /PID <PID> /F
```

**MongoDB connection error**
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- Check database user credentials

**AWS S3 error**
- Verify access keys
- Check bucket name
- Ensure bucket is private
- Verify IAM permissions

**Email not sending**
- Check Gmail app password (not regular password)
- Verify sender email in `.env`
- Check spam folder

## 📦 Dependencies Overview

### Frontend
- React 18 - UI library
- Vite - Fast build tool
- Tailwind CSS - Styling
- React Router - Navigation
- Axios - HTTP client
- React Icons - Icon library
- React Toastify - Notifications

### Backend
- Express - Web framework
- MongoDB & Mongoose - Database
- JWT - Authentication
- Bcryptjs - Password hashing
- Nodemailer - Email service
- AWS SDK - S3 integration
- Multer - File upload
- CORS - Cross-origin support

## 🚀 Deployment

See individual README files in each folder for deployment instructions to:
- Vercel (Frontend)
- Heroku/Railway (Backend)
- AWS/DigitalOcean (Backend)

## 📝 Notes

- All user passwords are hashed with bcrypt
- Email verification required before login
- Password reset tokens expire in 1 hour
- Verification tokens expire in 24 hours
- Files stored in private AWS S3 bucket
- File metadata stored in MongoDB Atlas

## 📞 Support

For issues or questions, refer to individual README files in:
- `googledrive-frontend/README.md`
- `googledrive-backend/README.md`
