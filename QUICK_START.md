# 🎬 QUICK START VIDEO GUIDE (Text Version)

## 5-Minute Getting Started Guide

### ⏱️ Minute 0: Understand What You Have

You now have a **complete Google Drive Clone** with:
- ✅ React frontend (fully built)
- ✅ Node.js backend (fully built)
- ✅ All features implemented
- ✅ All dependencies installed
- ✅ Complete documentation

**Time to working app:** ~5 minutes (after service setup)

---

## 📖 THE MINIMAL PATH

### 🚀 Step 1: Get External Services Ready (3-5 minutes)

#### Option A: Quick Setup (Free Tier)
```
1. MongoDB Atlas
   - Go to mongodb.com/cloud/atlas
   - Sign up → Create cluster → Get connection string
   
2. AWS S3
   - Go to aws.amazon.com
   - Create account → Create S3 bucket → Generate access keys
   
3. Gmail App Password
   - Go to myaccount.google.com
   - Enable 2FA → Generate app password
   
4. JWT Secret
   - Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   - Copy the output
```

### 📝 Step 2: Add Secrets to .env Files

**Backend .env** (already exists, just fill in):
```
MONGODB_URI=<paste your mongo string>
JWT_SECRET=<paste generated secret>
EMAIL_USER=<your email>
EMAIL_PASS=<app password from gmail>
AWS_ACCESS_KEY_ID=<from AWS>
AWS_SECRET_ACCESS_KEY=<from AWS>
AWS_BUCKET_NAME=googledrive-clone-bucket
```

**Frontend .env** (already configured, no changes needed)
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Google Drive Clone
```

### 🏃 Step 3: Run It (2 minutes)

**Open TWO Terminal Windows:**

```bash
# Terminal 1 - BACKEND
cd googledrive-backend
npm run dev
```

```bash
# Terminal 2 - FRONTEND  
cd googledrive-frontend
npm run dev
```

**You should see:**
- Backend: "Server running on port 5000"
- Frontend: "Local: http://localhost:3000"

### 🎯 Step 4: Test It (1-2 minutes)

1. Open http://localhost:3000 in browser
2. Click "Register"
3. Fill in form:
   ```
   First Name: John
   Last Name: Doe
   Email: test@gmail.com
   Password: Test123456
   ```
4. Click "Create Account"
5. **Check your email** for verification link
6. Click the link in email
7. Go back to http://localhost:3000/login
8. Login with your email and password
9. **You're in!** 🎉

### 📤 Step 5: Upload a File

1. Drag and drop a file into the upload area
2. File appears in dashboard
3. Click download to test
4. Click delete to remove

**That's it! You have a working Google Drive Clone** ✅

---

## 🗺️ FILE LOCATIONS QUICK MAP

```
Your Project Folder:
├── README.md ← Start here
├── SETUP.md ← Quick start
├── CONFIG.md ← Service setup (MongoDB, AWS, Gmail)
├── DEPLOYMENT.md ← Deploy when ready
│
├── googledrive-frontend/
│   ├── .env ← Add API URL (if needed)
│   ├── package.json ← Run: npm install
│   └── src/ ← React code
│
└── googledrive-backend/
    ├── .env ← Add MongoDB, AWS, Gmail here!
    ├── package.json ← Run: npm install (already done)
    └── server.js ← Backend entry point
```

---

## 🔄 WORKFLOW DURING DEVELOPMENT

### Daily Development Cycle

```
1. Start both servers (as shown above)
2. Make changes to code
3. Save file (auto-refreshes in browser)
4. Test in browser
5. Check browser console for errors
6. Check terminal for backend errors
7. Fix issues
8. Commit to git
9. Repeat
```

### Making Changes

**Frontend Changes:**
- Edit files in `googledrive-frontend/src/`
- Automatically reloads in browser (Vite hot reload)
- No need to restart server

**Backend Changes:**
- Edit files in `googledrive-backend/`
- Automatically restarts (nodemon watches files)
- Check terminal for errors

---

## 🆘 QUICK TROUBLESHOOTING

### Problem: Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <number> /F

# Or use different port
VITE_PORT=3001 npm run dev
```

### Problem: MongoDB Connection Error
```
Check .env file has:
✓ MONGODB_URI is filled in
✓ Your IP is whitelisted in MongoDB Atlas
✓ Database user password is correct
```

### Problem: AWS S3 Error
```
Check .env file has:
✓ AWS_ACCESS_KEY_ID is correct
✓ AWS_SECRET_ACCESS_KEY is correct
✓ AWS_BUCKET_NAME is correct
✓ Bucket exists and is private
```

### Problem: Email Not Sending
```
Check .env file:
✓ Use GMAIL APP PASSWORD (not regular password)
✓ EMAIL_USER is your gmail address
✓ EMAIL_PASS is 16-character app password
✓ 2FA is enabled on Gmail account
```

### Problem: Frontend Won't Load
```
Check:
✓ Backend is running (terminal shows "Server running on port 5000")
✓ VITE_API_URL in frontend .env points to backend
✓ No CORS errors in browser console
✓ Try http://localhost:3000 (not localhost:5000)
```

---

## 📊 WHAT'S IN EACH FOLDER

### googledrive-frontend/
```
Where the React app lives
- src/pages/ = Login, Register, Dashboard, etc.
- src/components/ = Navbar
- src/services/ = API calls to backend
- src/context/ = Authentication state management
```

### googledrive-backend/
```
Where the API lives
- routes/ = API endpoints (/auth, /files)
- controllers/ = Business logic
- models/ = Database schema (User, File)
- config/ = Database, AWS, Email setup
```

---

## 🎯 COMMON TASKS

### Change App Name
1. Open `googledrive-frontend/src/App.jsx`
2. Find "Google Drive Clone"
3. Change to your app name
4. Save (refreshes automatically)

### Change Colors
1. Open `googledrive-frontend/tailwind.config.js`
2. Modify color values
3. Save (refreshes automatically)

### Test Registration Email
1. Use a real email you can check
2. Or use a Gmail account
3. Check spam folder if email doesn't appear

### Upload Larger Files
1. Edit `googledrive-backend/controllers/fileController.js`
2. Find: `limits: { fileSize: 100 * 1024 * 1024 }`
3. Change 100 to your preferred size in MB

---

## ✅ SUCCESS INDICATORS

When everything is working:

**Frontend:**
- ✓ Loads without errors (white screen means problem)
- ✓ "Register" button clickable
- ✓ Forms show up
- ✓ Notifications appear

**Backend:**
- ✓ Terminal shows "Server running on port 5000"
- ✓ No red error messages
- ✓ Health check works: `curl http://localhost:5000/health`

**Integration:**
- ✓ Can register new user
- ✓ Verification email received
- ✓ Can click verification link
- ✓ Can login after verification
- ✓ Dashboard loads
- ✓ Can upload files

---

## 🎓 NEXT LEARNING STEPS

After you get it running:

1. **Understand the flow:**
   - User registers → Email sent → User verifies → User can login

2. **Explore the code:**
   - Frontend: Look at `src/pages/Login.jsx` to see form handling
   - Backend: Look at `controllers/authController.js` to see logic

3. **Make small changes:**
   - Change button color
   - Change form placeholder text
   - Add a new field to registration

4. **Deploy:**
   - Follow DEPLOYMENT.md when ready
   - Get your app on the internet
   - Show your friends!

---

## 📚 DOCUMENTATION YOU HAVE

| Document | Use When |
|----------|----------|
| **README.md** | You want overview of project |
| **SETUP.md** | You want quick start instructions |
| **CONFIG.md** | You need to setup MongoDB/AWS/Gmail |
| **DEPLOYMENT.md** | You want to deploy to internet |
| **Folder READMEs** | You need frontend/backend specific help |

---

## 🚀 YOU'RE READY!

That's it! You have everything you need:

1. ✅ Complete code (38+ files)
2. ✅ Dependencies installed (300+ packages)
3. ✅ Documentation (5 guides)
4. ✅ Configuration templates
5. ✅ Examples and comments

**Now go create something amazing!** 🎉

---

## 💡 PRO TIPS

1. **Keep terminals open** - One for each server, don't close them
2. **Check console errors** - Browser F12 shows frontend errors, terminal shows backend errors
3. **Use incognito mode** - If login/logout acts weird
4. **Clear browser cache** - If styles look wrong
5. **Restart servers** - If something acts weird (Ctrl+C then npm run dev again)
6. **Read error messages** - They tell you what's wrong!
7. **Use console.log()** - Add debugging anywhere in code
8. **Check network tab** - Browser F12 → Network to see API calls

---

**Version:** 1.0.0  
**Last Updated:** February 4, 2026  
**Status:** Ready to Code ✅

Let's build amazing things! 🚀
