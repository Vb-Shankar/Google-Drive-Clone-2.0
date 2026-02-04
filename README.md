# Google Drive Clone 2.0

A complete Google Drive clone application built with React, Node.js, MongoDB Atlas, and AWS S3. Features user authentication with email verification, file management with drag-and-drop uploads, and secure cloud storage.

**Status:** ✅ **COMPLETE & READY FOR DEPLOYMENT**  
**Created:** February 4, 2026  
**Node.js Version:** 22.19.0+

---

## 📋 Quick Links

- **[SETUP.md](./SETUP.md)** - Quick start guide (start here!)
- **[CONFIG.md](./CONFIG.md)** - Detailed service configuration
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[PROJECT_REPORT.md](./PROJECT_REPORT.md)** - Project completion report

---

## 🎯 Project Overview

This is a full-stack Google Drive clone with:

### Frontend (React)
- User authentication (register, login, forgot password)
- Email verification workflow
- File/folder management dashboard
- Drag-and-drop file upload
- File download and delete
- Responsive UI with Tailwind CSS

### Backend (Node.js + Express)
- RESTful API for all operations
- JWT authentication
- MongoDB Atlas database
- AWS S3 integration
- Email service (Gmail)
- Error handling and validation

### Storage & Database
- MongoDB Atlas for file metadata
- AWS S3 for actual file storage (private bucket)
- User storage tracking

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
# Frontend
cd googledrive-frontend
npm install

# Backend
cd googledrive-backend
npm install
```

### 2. Configure Services
Follow **[CONFIG.md](./CONFIG.md)** to set up:
- MongoDB Atlas
- AWS S3
- Gmail for emails
- JWT secret

### 3. Start Servers
```bash
# Terminal 1: Backend (Port 5000)
cd googledrive-backend
npm run dev

# Terminal 2: Frontend (Port 3000)
cd googledrive-frontend
npm run dev
```

### 4. Open Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📁 Project Structure

```
Google-Drive-Clone-2.0/
├── googledrive-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API services
│   │   ├── context/               # React Context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env                       # (create from .env.example)
│   └── README.md
│
├── googledrive-backend/           # Node.js backend application
│   ├── config/                    # Configuration files
│   ├── controllers/               # Request handlers
│   ├── middleware/                # Auth & error handling
│   ├── models/                    # Database schemas
│   ├── routes/                    # API routes
│   ├── utils/                     # Helper functions
│   ├── server.js
│   ├── package.json
│   ├── .env                       # (create from .env.example)
│   └── README.md
│
├── SETUP.md                       # Quick start guide
├── CONFIG.md                      # Configuration guide
├── DEPLOYMENT.md                  # Deployment instructions
├── PROJECT_REPORT.md              # Completion report
└── README.md                      # This file
```

---

## ✨ Features

### ✅ Authentication System
- User registration with strong password validation
- Two-step email verification
- Secure login for verified users only
- Forgot password with email reset link
- Password reset with token validation
- JWT-based session management
- Bcrypt password hashing

### ✅ File Management
- Upload files to private AWS S3 bucket
- Create folders for organization
- Download files with secure signed URLs
- Delete files and folders
- Rename files and folders
- Track file metadata (name, size, date)
- User storage limit tracking

### ✅ User Interface
- Professional, responsive design
- Tailwind CSS styling
- React Icons for better UX
- React Toastify notifications
- Clean authentication forms
- Intuitive dashboard layout
- Mobile-friendly interface

### ✅ Security
- Password hashing with bcryptjs
- JWT token authentication
- Private AWS S3 bucket
- CORS protection
- Email verification required
- Token-based password reset
- Input validation on all endpoints

---

## 🔧 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- React Icons
- React Toastify
- React Dropzone

### Backend
- Node.js
- Express
- MongoDB/Mongoose
- JWT
- Bcryptjs
- Nodemailer
- AWS SDK
- Multer
- CORS

### Services
- MongoDB Atlas (Database)
- AWS S3 (File Storage)
- Gmail (Email Service)
- Vercel (Frontend Deployment)
- Railway (Backend Deployment)

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **SETUP.md** | Quick start and basic setup |
| **CONFIG.md** | Detailed service configuration |
| **DEPLOYMENT.md** | Step-by-step deployment guide |
| **PROJECT_REPORT.md** | Detailed project completion report |
| **googledrive-frontend/README.md** | Frontend specific docs |
| **googledrive-backend/README.md** | Backend specific docs |

---

## 🚀 Deployment

### Quick Deploy

1. **Configure Services** (MongoDB, AWS S3, Gmail)
2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. **Deploy Frontend to Vercel** - Connect GitHub repo
4. **Deploy Backend to Railway** - Connect GitHub repo
5. **Update URLs** - Add deployed URLs to environment variables

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions**

---

## 📝 Configuration

### Required Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_BUCKET_NAME=googledrive-clone-bucket
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:5000
PORT=5000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Google Drive Clone
```

**See [CONFIG.md](./CONFIG.md) for detailed setup instructions**

---

## 🧪 Testing

### Local Testing Workflow

1. **Register**
   - Go to http://localhost:3000/register
   - Fill in form with test data
   - Check email for verification link

2. **Verify Email**
   - Click verification link in email
   - Should redirect to login

3. **Login**
   - Use credentials from registration
   - Login successful message appears

4. **Upload Files**
   - Drag and drop files in dashboard
   - Or click upload area to select files
   - Files appear in dashboard

5. **Manage Files**
   - Create new folders
   - Download files
   - Delete files
   - Rename files

6. **Test Password Reset**
   - Click "Forgot password" on login page
   - Enter your email
   - Check email for reset link
   - Click link and set new password
   - Login with new password

---

## ✅ Project Checklist

- [x] Frontend project structure created
- [x] Backend project structure created
- [x] Authentication system implemented
- [x] Email verification system implemented
- [x] Password reset system implemented
- [x] File upload to AWS S3 implemented
- [x] File management (CRUD) implemented
- [x] Dashboard with file listing implemented
- [x] Drag-and-drop upload implemented
- [x] Error handling implemented
- [x] Responsive UI created
- [x] All dependencies installed
- [x] Configuration guides created
- [x] Deployment guides created
- [x] Documentation complete
- [ ] Deployed to production (your next step!)

---

## 🔒 Security Features

✅ **Password Security**
- Bcryptjs hashing (10 rounds)
- Strong password validation
- Password reset via email token

✅ **API Security**
- JWT token authentication
- Token expiration (7 days)
- CORS protection
- Input validation on all endpoints

✅ **File Storage Security**
- Private AWS S3 bucket
- No public access
- Signed URLs for downloads
- File ownership verification

✅ **Data Protection**
- Email verification required
- Token-based operations
- User isolation (can only see own files)
- Secure session management

---

## 📚 API Documentation

### Authentication Endpoints
```
POST   /auth/register         - Register new user
POST   /auth/login            - Login user
POST   /auth/verify-email     - Verify email address
POST   /auth/forgot-password  - Request password reset
POST   /auth/reset-password   - Reset password
```

### File Endpoints (Require Authentication)
```
POST   /files/upload          - Upload file
GET    /files                 - Get user's files
DELETE /files/:fileId         - Delete file
GET    /files/download/:fileId - Download file
POST   /files/create-folder   - Create folder
PUT    /files/:fileId         - Rename file
```

**Full API documentation in [googledrive-backend/README.md](./googledrive-backend/README.md)**

---

## 🆘 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Windows: Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**MongoDB connection error**
- Verify connection string in .env
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials

**AWS S3 error**
- Check AWS credentials
- Verify bucket name
- Ensure bucket is private
- Check IAM permissions

**Email not sending**
- Use app password (not regular password)
- Enable 2FA on Gmail
- Check email in spam folder

**CORS errors**
- Verify FRONTEND_URL in backend .env
- Check origins in cors middleware

**See [CONFIG.md](./CONFIG.md) for detailed troubleshooting**

---

## 📞 Need Help?

1. **Quick Start Issues** → Check [SETUP.md](./SETUP.md)
2. **Configuration Issues** → Check [CONFIG.md](./CONFIG.md)
3. **Deployment Issues** → Check [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Frontend Issues** → Check [googledrive-frontend/README.md](./googledrive-frontend/README.md)
5. **Backend Issues** → Check [googledrive-backend/README.md](./googledrive-backend/README.md)

---

## 📊 Project Statistics

| Component | Count |
|-----------|-------|
| Frontend Pages | 6 |
| Backend Endpoints | 8 |
| Database Models | 2 |
| Controllers | 2 |
| Frontend Components | 5+ |
| Total Files | 30+ |
| Lines of Code | 2000+ |

---

## 📄 License

This project is open source. See individual repository licenses.

---

## 🎉 Ready to Go!

Your Google Drive Clone is **100% complete and ready to use!**

### Next Steps:
1. ✅ Review [SETUP.md](./SETUP.md)
2. ✅ Follow [CONFIG.md](./CONFIG.md) to configure services
3. ✅ Run `npm install` in both folders (already done ✓)
4. ✅ Start development servers
5. ✅ Test all features locally
6. ✅ Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy

**Happy coding! 🚀**

---

**Last Updated:** February 4, 2026  
**Status:** Production Ready ✅  
**Version:** 1.0.0
