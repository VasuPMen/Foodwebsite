# 🔐 Environment Variables Guide

## Backend Environment Variables (Render)

### Required Variables:

```bash
# MongoDB Connection String
# Get from: MongoDB Atlas → Connect → Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fooddelivery?retryWrites=true&w=majority

# JWT Secret Key
# Generate a strong random string (at least 32 characters)
# Use: https://randomkeygen.com/ or: openssl rand -base64 32
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters

# Node Environment
NODE_ENV=production
```

### Optional Variables:

```bash
# Server Port (Render sets this automatically, but you can override)
PORT=10000

# Allowed Origins for CORS (add after deploying frontend)
# Add your Vercel frontend and admin URLs (comma-separated, no spaces)
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

---

## Frontend Environment Variables (Vercel)

### Required Variables:

```bash
# Backend API URL
# Replace with your Render backend URL after deployment
VITE_API_URL=https://your-backend.onrender.com
```

**Example:**
```
VITE_API_URL=https://food-delivery-backend.onrender.com
```

---

## Admin Panel Environment Variables (Vercel)

### Required Variables:

```bash
# Backend API URL
# Same as frontend - your Render backend URL
VITE_API_URL=https://your-backend.onrender.com
```

**Example:**
```
VITE_API_URL=https://food-delivery-backend.onrender.com
```

---

## How to Set Environment Variables

### Render (Backend):
1. Go to your service dashboard
2. Click on **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Enter key and value
5. Save (will auto-redeploy)

### Vercel (Frontend & Admin):
1. Go to your project dashboard
2. Click on **"Settings"** → **"Environment Variables"**
3. Click **"Add New"**
4. Enter key and value
5. Select environment (Production, Preview, Development)
6. Save
7. Redeploy if needed

---

## Important Notes

1. **Never commit `.env` files to GitHub!** They contain sensitive information.
2. **Always use environment variables** for API URLs and secrets.
3. **Vite variables** must start with `VITE_` to be accessible in the frontend.
4. **JWT_SECRET** should be a long, random string (at least 32 characters).
5. **MONGODB_URI** should include your database name in the connection string.

---

## Security Best Practices

- ✅ Use strong, random JWT secrets
- ✅ Never share your environment variables
- ✅ Use different secrets for development and production
- ✅ Restrict CORS to only your frontend URLs in production
- ✅ Regularly rotate secrets and passwords
- ✅ Use MongoDB Atlas IP whitelist (though 0.0.0.0/0 is needed for Render)

---

## Troubleshooting

**Backend can't connect to database?**
- Check `MONGODB_URI` format
- Verify MongoDB network access allows all IPs
- Check database user credentials

**Frontend can't reach backend?**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Make sure backend URL includes `https://`

**CORS errors?**
- Add frontend URLs to `ALLOWED_ORIGINS` in backend
- Make sure URLs match exactly (including https://)
- Check backend logs for CORS errors

---

## Quick Reference

| Platform | Variable | Example |
|----------|----------|---------|
| Render (Backend) | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| Render (Backend) | `JWT_SECRET` | `my_super_secret_key_12345` |
| Render (Backend) | `ALLOWED_ORIGINS` | `https://app.vercel.app,https://admin.vercel.app` |
| Vercel (Frontend) | `VITE_API_URL` | `https://backend.onrender.com` |
| Vercel (Admin) | `VITE_API_URL` | `https://backend.onrender.com` |

