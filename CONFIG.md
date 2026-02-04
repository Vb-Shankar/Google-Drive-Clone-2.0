# Configuration Guide - Google Drive Clone

## 🔧 Environment Configuration

### Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up or login

2. **Create a Cluster**
   - Click "Create a Database"
   - Choose Free tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Set Up Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (strong password recommended)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Add Current IP Address" (or enter your IP manually)
   - Confirm

5. **Get Connection String**
   - Go to Clusters
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Example: `mongodb+srv://myuser:mypassword@cluster0.mongodb.net/googledrive?retryWrites=true&w=majority`

6. **Update Backend .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/googledrive?retryWrites=true&w=majority
   ```

### Step 2: AWS S3 Setup

1. **Create AWS Account**
   - Go to https://aws.amazon.com
   - Sign up or login

2. **Create S3 Bucket**
   - Go to S3 service
   - Click "Create bucket"
   - Bucket name: `googledrive-clone-bucket` (must be globally unique)
   - Region: Select your region
   - Click "Create bucket"

3. **Block Public Access**
   - Click your bucket
   - Go to "Permissions"
   - Click "Block public access"
   - Check all 4 options (Block all public access)
   - Save

4. **Create IAM User**
   - Go to IAM (Identity and Access Management)
   - Click "Users"
   - Click "Create user"
   - Username: `googledrive-s3-user`
   - Click "Next"

5. **Attach S3 Permissions**
   - Click "Attach policies directly"
   - Search for "AmazonS3FullAccess"
   - Check it
   - Click "Next" then "Create user"

6. **Generate Access Keys**
   - Click the user you just created
   - Go to "Security credentials"
   - Click "Create access key"
   - Select "Application running outside AWS"
   - Click "Next" then "Create access key"
   - Copy and save both Access Key ID and Secret Access Key

7. **Update Backend .env**
   ```
   AWS_ACCESS_KEY_ID=your_access_key_id_here
   AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=googledrive-clone-bucket
   ```

### Step 3: Gmail Setup (for Email Service)

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com
   - Click "Security"
   - Search for "2-Step Verification"
   - Follow the steps to enable it

2. **Generate App Password**
   - Go to https://myaccount.google.com
   - Click "Security"
   - Search for "App passwords"
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Copy this password (without spaces)

3. **Update Backend .env**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Step 4: JWT Secret Setup

1. **Generate a Secure Secret**
   - Use Node.js to generate:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   - Or use an online generator: https://www.uuidgenerator.net/

2. **Update Backend .env**
   ```
   JWT_SECRET=your-generated-secret-here
   JWT_EXPIRE=7d
   ```

## 📝 Complete Backend .env Template

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/googledrive?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your-generated-secret-key-32-chars-minimum
JWT_EXPIRE=7d

# Email Service (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=googledrive-clone-bucket

# Application URLs
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:5000
PORT=5000
```

## 📝 Frontend .env Template

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Google Drive Clone
```

## ✅ Verification Checklist

After setting up all services:

- [ ] MongoDB Atlas account created
- [ ] Database user created with strong password
- [ ] Your IP whitelisted in MongoDB
- [ ] Connection string verified
- [ ] AWS account created
- [ ] S3 bucket created and private
- [ ] IAM user created with S3 access
- [ ] Access keys generated and saved
- [ ] Gmail 2FA enabled
- [ ] Gmail app password generated
- [ ] JWT secret generated
- [ ] All .env variables filled in
- [ ] Backend starts without connection errors
- [ ] Frontend starts successfully

## 🚀 Testing the Setup

### 1. Start Backend
```bash
cd googledrive-backend
npm run dev
```
Should see: "Server running on port 5000"

### 2. Start Frontend
```bash
cd googledrive-frontend
npm run dev
```
Should see: "Local: http://localhost:3000"

### 3. Test Health Endpoint
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"Server is running"}`

### 4. Test Registration
1. Open http://localhost:3000
2. Click "Register"
3. Fill in form with test data
4. Submit
5. Check email for verification link
6. Click verification link
7. Should be redirected to login

## 🔒 Security Notes

- **Never commit .env to Git** - It's in .gitignore for a reason
- **Keep access keys secret** - Treat like passwords
- **Use strong passwords** - Especially for MongoDB and Gmail
- **Enable IP whitelisting** - Restrict database access
- **Use private S3 buckets** - Never make public
- **Rotate access keys regularly** - AWS best practice
- **Use environment variables in production** - Don't hardcode secrets

## 🆘 Common Errors & Solutions

### MongoDB Connection Error
```
Error: querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net
```
**Solution:**
- Check MongoDB_URI is correct
- Verify IP is whitelisted
- Check credentials are correct
- Verify database user exists

### AWS S3 Permission Error
```
Error: User: arn:aws:iam::123456789:user/googledrive-s3-user is not authorized
```
**Solution:**
- Verify IAM user has S3 permissions
- Check access keys are correct
- Verify bucket name matches .env

### Gmail Authentication Error
```
Error: Invalid login credentials
```
**Solution:**
- Use app password (not regular password)
- Verify 2FA is enabled
- Check email address is correct
- Don't include spaces in app password

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
VITE_PORT=3001 npm run dev
```

## 📞 Need Help?

1. Check the error message carefully
2. Review the setup steps for that service
3. Verify all credentials are correct
4. Check service documentation:
   - MongoDB: https://docs.mongodb.com/
   - AWS: https://docs.aws.amazon.com/
   - Gmail: https://support.google.com/accounts/
   - Express: https://expressjs.com/
   - React: https://react.dev/

