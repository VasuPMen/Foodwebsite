# ✅ Deployment Checklist

Use this checklist to ensure everything is set up correctly for deployment.

## Pre-Deployment Setup

### MongoDB Atlas
- [ ] Created MongoDB Atlas account
- [ ] Created FREE cluster (M0)
- [ ] Created database user (username & password saved)
- [ ] Configured network access (0.0.0.0/0 - Allow from anywhere)
- [ ] Got connection string
- [ ] Tested connection string locally

### GitHub
- [ ] Created GitHub account
- [ ] Created new repository
- [ ] Pushed all code to GitHub
- [ ] Verified .gitignore excludes sensitive files (.env, node_modules, etc.)

### Accounts Created
- [ ] Render account created
- [ ] Vercel account created
- [ ] All accounts linked to GitHub

---

## Backend Deployment (Render)

### Configuration
- [ ] Connected GitHub repository to Render
- [ ] Created Web Service
- [ ] Set Root Directory: `Backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node server.js`
- [ ] Set Environment: `Node`

### Environment Variables
- [ ] `MONGODB_URI` set (with actual connection string)
- [ ] `JWT_SECRET` set (strong random string, 32+ characters)
- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` set (optional, Render sets automatically)

### Deployment
- [ ] Service deployed successfully
- [ ] Backend URL copied (e.g., https://your-backend.onrender.com)
- [ ] Tested backend endpoint: `https://your-backend.onrender.com/`
- [ ] Verified API is working

---

## Frontend Deployment (Vercel)

### Configuration
- [ ] Connected GitHub repository to Vercel
- [ ] Created new project
- [ ] Set Root Directory: `Frontend`
- [ ] Set Framework: Vite
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL` set to backend URL (e.g., https://your-backend.onrender.com)

### Deployment
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., https://your-frontend.vercel.app)
- [ ] Tested frontend loads correctly
- [ ] Verified API calls work

---

## Admin Panel Deployment (Vercel)

### Configuration
- [ ] Created second project in Vercel (same repository)
- [ ] Set Root Directory: `Admin/Admin-pannel`
- [ ] Set Framework: Vite
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL` set to backend URL (same as frontend)

### Deployment
- [ ] Admin panel deployed successfully
- [ ] Admin URL copied (e.g., https://your-admin.vercel.app)
- [ ] Tested admin panel loads correctly

---

## Post-Deployment Configuration

### Backend CORS Update
- [ ] Added `ALLOWED_ORIGINS` to Render environment variables
- [ ] Included frontend URL in `ALLOWED_ORIGINS`
- [ ] Included admin URL in `ALLOWED_ORIGINS`
- [ ] Backend redeployed with new CORS settings

### URLs Documentation
- [ ] Frontend URL saved
- [ ] Admin URL saved
- [ ] Backend URL saved
- [ ] URLs added to resume/project documentation

---

## Testing Checklist

### Frontend Testing
- [ ] Home page loads
- [ ] User registration works
- [ ] User login works
- [ ] Food items display correctly
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Cart total calculates correctly
- [ ] Place order works
- [ ] Order history displays
- [ ] Images load correctly

### Admin Panel Testing
- [ ] Admin login works
- [ ] Add food item works
- [ ] Food items list displays
- [ ] Remove food item works
- [ ] Image upload works
- [ ] Orders list displays
- [ ] Update order status works

### Backend Testing
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] Database connections work
- [ ] File uploads work
- [ ] CORS allows frontend requests
- [ ] Error handling works

---

## Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] MongoDB password is strong
- [ ] Environment variables not committed to GitHub
- [ ] CORS restricted to frontend URLs (optional but recommended)
- [ ] Database user has appropriate permissions
- [ ] All sensitive data in environment variables

---

## Documentation

- [ ] Deployment guide reviewed
- [ ] Environment variables documented
- [ ] URLs documented
- [ ] Project README updated with live URLs
- [ ] Resume updated with project links

---

## Final Verification

- [ ] All three deployments (frontend, admin, backend) are live
- [ ] All features work end-to-end
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database operations work correctly
- [ ] Images upload and display correctly

---

## 🎉 Deployment Complete!

Once all items are checked, your Food Delivery App is fully deployed and ready to share!

### Your Live URLs:
- **Frontend:** _______________________
- **Admin Panel:** _______________________
- **Backend API:** _______________________

---

## Need Help?

- Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `ENVIRONMENT_VARIABLES.md` for environment variable setup
- Check `QUICK_START.md` for quick reference
- Review platform documentation (Render, Vercel, MongoDB Atlas)

---

## Common Issues & Solutions

### Backend not responding
- ✅ Check Render logs
- ✅ Verify environment variables
- ✅ Check MongoDB connection

### CORS errors
- ✅ Update ALLOWED_ORIGINS in Render
- ✅ Verify URLs match exactly
- ✅ Check backend logs

### Database connection failed
- ✅ Verify MongoDB network access
- ✅ Check connection string format
- ✅ Verify credentials

### Frontend can't reach backend
- ✅ Check VITE_API_URL is set correctly
- ✅ Verify backend URL is accessible
- ✅ Check CORS configuration

---

**Good luck with your deployment! 🚀**

