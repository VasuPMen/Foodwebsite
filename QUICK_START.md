# 🚀 Quick Start Deployment Guide

## Prerequisites Checklist
- [ ] GitHub account created
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Vercel account created

## Step-by-Step Deployment (30 minutes)

### Step 1: Setup MongoDB Atlas (5 minutes)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create FREE cluster (M0)
3. Create database user
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string

### Step 2: Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/food-delivery-app.git
git push -u origin main
```

### Step 3: Deploy Backend to Render (10 minutes)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory:** `Backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRET` = Random secret key
   - `PORT` = 10000
6. Deploy and copy backend URL

### Step 4: Deploy Frontend to Vercel (5 minutes)
1. Go to [Vercel](https://vercel.com/)
2. New Project → Import repository
3. Configure:
   - **Root Directory:** `Frontend`
   - **Framework:** Vite
4. Add Environment Variable:
   - `VITE_API_URL` = Your Render backend URL
5. Deploy and copy frontend URL

### Step 5: Deploy Admin Panel to Vercel (5 minutes)
1. In Vercel, New Project → Same repository
2. Configure:
   - **Root Directory:** `Admin/Admin-pannel`
   - **Framework:** Vite
3. Add Environment Variable:
   - `VITE_API_URL` = Your Render backend URL
4. Deploy

### Step 6: Update Backend CORS (2 minutes)
1. Go to Render → Your backend service
2. Environment → Add:
   - `ALLOWED_ORIGINS` = Your Vercel URLs (comma-separated)
3. Redeploy

### Step 7: Test Everything (3 minutes)
- [ ] Frontend loads
- [ ] User registration works
- [ ] Login works
- [ ] Add to cart works
- [ ] Place order works
- [ ] Admin panel loads
- [ ] Admin can add food items
- [ ] Admin can view orders

## 🎉 Done! Your app is live!

### Your URLs:
- **Frontend:** https://your-frontend.vercel.app
- **Admin:** https://your-admin.vercel.app
- **Backend:** https://your-backend.onrender.com

## ⚠️ Important Notes

1. **Render Free Tier:** Services spin down after 15 min inactivity. First request takes 30-60 seconds.

2. **Environment Variables:** Always use environment variables, never hardcode secrets!

3. **CORS:** Make sure to add your frontend URLs to backend CORS settings.

4. **MongoDB:** Free tier gives 512MB storage - perfect for development.

## 🐛 Common Issues

**Backend not responding?**
- Check Render logs
- Verify environment variables
- Check MongoDB connection

**CORS errors?**
- Update ALLOWED_ORIGINS in Render
- Make sure URLs match exactly

**Database connection failed?**
- Check MongoDB network access (0.0.0.0/0)
- Verify connection string format
- Check username/password

## 📚 Full Documentation
See `DEPLOYMENT_GUIDE.md` for detailed instructions.

