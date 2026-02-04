# Google Drive Clone - Deployment Guide

## 🚀 Deployment Options & Instructions

### Part 1: GitHub Setup

Both projects should be pushed to GitHub with specific repository names as per requirements.

#### Frontend Repository

1. **Create Frontend Repository**
   ```bash
   cd googledrive-frontend
   git init
   git add .
   git commit -m "Initial commit: Google Drive Clone Frontend"
   git branch -M main
   git remote add origin https://github.com/yourusername/googledrive-frontend.git
   git push -u origin main
   ```

2. **Verify Repository**
   - Navigate to https://github.com/yourusername/googledrive-frontend
   - Ensure all files are pushed
   - Repository name format: **googledrive-frontend**

#### Backend Repository

1. **Create Backend Repository**
   ```bash
   cd googledrive-backend
   git init
   git add .
   git commit -m "Initial commit: Google Drive Clone Backend"
   git branch -M main
   git remote add origin https://github.com/yourusername/googledrive-backend.git
   git push -u origin main
   ```

2. **Verify Repository**
   - Navigate to https://github.com/yourusername/googledrive-backend
   - Ensure all files are pushed
   - Repository name format: **googledrive-backend**

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Advantages:** Free, fast, easy, serverless, automatic deployments

1. **Deploy Frontend**
   ```bash
   npm install -g vercel
   cd googledrive-frontend
   vercel
   ```

2. **Follow Prompts**
   - Link to GitHub account
   - Select your repository
   - Accept default settings
   - Deployment completes automatically

3. **Get Your URL**
   - Vercel provides a URL like: `https://googledrive-frontend.vercel.app`
   - Production URL: `https://googledrive-[project-name].vercel.app`

4. **Configure Environment**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add: `VITE_API_URL=https://your-backend-domain.app`
   - Redeploy

### Option 2: Netlify

1. **Deploy to Netlify**
   ```bash
   cd googledrive-frontend
   npm run build
   # Then drag-and-drop the 'dist' folder to Netlify
   # Or connect GitHub for automatic deployments
   ```

2. **Custom Domain**
   - Domain Settings > Domains > Add a domain
   - Point your domain to Netlify

### Option 3: GitHub Pages

1. **Update vite.config.js**
   ```javascript
   export default {
     base: '/googledrive-frontend/',
     // ... rest of config
   }
   ```

2. **Deploy**
   ```bash
   npm run build
   # Push dist folder to gh-pages branch
   ```

---

## 🔌 Backend Deployment

### Option 1: Railway.app (Recommended)

**Advantages:** Free tier, easy GitHub integration, no credit card needed

1. **Sign Up**
   - Go to https://railway.app
   - Sign in with GitHub
   - Accept permissions

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your `googledrive-backend` repository

3. **Configure Environment**
   - In Railway dashboard, click your project
   - Go to Variables
   - Add all variables from your `.env`:
     ```
     MONGODB_URI=...
     JWT_SECRET=...
     EMAIL_SERVICE=gmail
     EMAIL_USER=...
     EMAIL_PASS=...
     AWS_ACCESS_KEY_ID=...
     AWS_SECRET_ACCESS_KEY=...
     AWS_REGION=us-east-1
     AWS_BUCKET_NAME=...
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     BASE_URL=https://your-backend-domain.railway.app
     PORT=3000
     ```

4. **Deploy**
   - Railway automatically deploys on push
   - Get your backend URL from Railway dashboard
   - Format: `https://googledrive-backend-production.railway.app`

5. **Update Frontend**
   - Set `VITE_API_URL` to your Railway backend URL
   - Redeploy frontend

### Option 2: Render

**Advantages:** Free tier, GitHub connected, auto-deploy

1. **Create Account**
   - Go to https://render.com
   - Sign in with GitHub

2. **Create Web Service**
   - Click "New" > "Web Service"
   - Connect your backend repository
   - Select `googledrive-backend`

3. **Configure**
   - Name: `googledrive-backend`
   - Runtime: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables (same as above)

4. **Deploy**
   - Click "Create Web Service"
   - Render automatically builds and deploys
   - Get your URL and update frontend

### Option 3: Heroku (Paid Only)

1. **Prepare Procfile**
   ```
   # Create Procfile in root of backend folder
   web: npm start
   ```

2. **Deploy**
   ```bash
   heroku login
   heroku create googledrive-backend
   git push heroku main
   heroku config:set MONGODB_URI=...
   # Set all env variables
   ```

---

## 📝 DNS & Custom Domain Setup

### For Custom Domain (Optional)

1. **Frontend Custom Domain (Vercel)**
   - In Vercel Settings > Domains
   - Add your domain
   - Update DNS records:
     ```
     CNAME yourdomain.com -> cname.vercel-dns.com
     ```

2. **Backend Custom Domain (Railway/Render)**
   - Get your platform's DNS target
   - Update DNS:
     ```
     CNAME api.yourdomain.com -> your-railway-domain
     ```

3. **Update Frontend .env**
   ```
   VITE_API_URL=https://api.yourdomain.com
   ```

---

## ✅ Post-Deployment Checklist

After deploying both frontend and backend:

- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] User can register (receives verification email)
- [ ] User can verify email and login
- [ ] User can upload files
- [ ] User can create folders
- [ ] User can download files
- [ ] User can delete files
- [ ] Password reset works
- [ ] Forgot password email received
- [ ] All UI elements display correctly
- [ ] Responsive design works on mobile
- [ ] HTTPS/SSL certificate active
- [ ] No console errors in browser
- [ ] No errors in backend logs

---

## 🔍 Monitoring & Maintenance

### Monitor Deployments

1. **Vercel Dashboard**
   - Analytics > Overview
   - Deployments > Recent
   - Check build logs for errors

2. **Railway Dashboard**
   - Logs > View logs
   - Metrics > View performance
   - Deployments > Rollback if needed

3. **Error Tracking**
   - Frontend: Browser console (F12)
   - Backend: Application logs
   - Email alerts for crashes

### Update Deployments

1. **Make Changes Locally**
   ```bash
   git add .
   git commit -m "Feature: description"
   git push origin main
   ```

2. **Automatic Deployment**
   - Vercel/Railway auto-deploy on push
   - Monitor deployment status
   - Check logs for errors

---

## 🆘 Common Deployment Issues

### Frontend Won't Load

**Error:** Blank page or cannot reach server

**Solutions:**
1. Check `VITE_API_URL` environment variable
2. Verify backend is deployed and running
3. Check browser console for CORS errors
4. Verify API endpoint is correct

### Backend Connection Error

**Error:** Cannot connect to MongoDB/S3

**Solutions:**
1. Verify all environment variables are set
2. Check MongoDB Atlas IP whitelist
3. Verify AWS credentials and permissions
4. Check service status pages

### Email Not Sending

**Error:** Registration email not received

**Solutions:**
1. Verify Gmail app password (not regular password)
2. Check email address in .env
3. Verify 2-factor authentication is enabled
4. Check spam folder
5. Use development mode for testing

### Authentication Failures

**Error:** "Invalid token" or "Not authenticated"

**Solutions:**
1. Clear browser cookies/local storage
2. Verify JWT_SECRET matches between deployments
3. Check token expiration time
4. Verify frontend stores token correctly

---

## 📊 Production Optimization

### Frontend Optimization

1. **Update vite.config.js**
   ```javascript
   build: {
     minify: 'terser',
     cssCodeSplit: true,
     rollupOptions: {
       output: {
         manualChunks: {
           vendor: ['react', 'react-dom', 'axios']
         }
       }
     }
   }
   ```

2. **Add Build Optimization**
   ```bash
   npm run build
   # Check bundle size: npx vite preview
   ```

### Backend Optimization

1. **Update package.json start script**
   ```json
   "start": "NODE_ENV=production node server.js"
   ```

2. **Add Error Logging**
   ```javascript
   // In server.js, add error logging service
   ```

---

## 📋 Submission Requirements

Create a text file with the following information:

**File: DEPLOYMENT_INFO.txt**

```
PROJECT NAME: Google Drive Clone

GITHUB REPOSITORIES:
Frontend Repository: https://github.com/yourusername/googledrive-frontend
Backend Repository: https://github.com/yourusername/googledrive-backend

DEPLOYED URLS:
Frontend URL: https://googledrive-frontend-[yourname].vercel.app
Backend URL: https://googledrive-backend-[yourname].railway.app

LATEST COMMITS:
Frontend Commit: [hash from: git log -1 --pretty=format:"%H"]
Backend Commit: [hash from: git log -1 --pretty=format:"%H"]

GITHUB PROFILE: https://github.com/yourusername

DEPLOYED: [Yes/No]
FULLY FUNCTIONAL: [Yes/No]
DEPLOYMENT PLATFORM: Vercel (Frontend), Railway (Backend)
```

---

## 🎯 Final Steps

1. **Test Everything**
   - Complete user flow from registration to file upload
   - Test all features on mobile and desktop
   - Check error handling

2. **Document**
   - Update README files with deployed URLs
   - Document any custom changes
   - Add deployment notes

3. **Submit**
   - Push all code to GitHub
   - Create DEPLOYMENT_INFO.txt
   - Provide all URLs and commit hashes
   - Follow submission format exactly

4. **Monitor**
   - Check deployment regularly
   - Monitor error logs
   - Be ready to provide support URL

---

## 📞 Deployment Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app/
- **Render Docs:** https://render.com/docs/
- **GitHub Pages:** https://docs.github.com/en/pages/
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **AWS S3:** https://docs.aws.amazon.com/s3/

---

**Status:** Ready for Deployment ✅

All components are production-ready. Follow this guide to deploy your application to the world!
