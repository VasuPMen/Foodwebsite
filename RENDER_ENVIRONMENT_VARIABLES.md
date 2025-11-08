# 🎯 Render Environment Variables - Step by Step Guide

## Where to Add Environment Variables in Render

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your backend service (or create a new one)
3. Click on the **"Environment"** tab
4. Click **"Add Environment Variable"** button
5. Add each variable one by one (see below)

---

## ✅ Required Environment Variables (Add These First)

### 1. MONGODB_URI

**Key:** `MONGODB_URI`

**How to Get the Value:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `fooddelivery` (or your database name)

**Example Value:**
```
mongodb+srv://myusername:mypassword123@cluster0.abc123.mongodb.net/fooddelivery?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `myusername` with your MongoDB username
- Replace `mypassword123` with your MongoDB password
- Replace `cluster0.abc123.mongodb.net` with your actual cluster URL
- Make sure to include `/fooddelivery` (or your database name) before the `?`

---

### 2. JWT_SECRET

**Key:** `JWT_SECRET`

**How to Generate:**
- Option 1: Use online generator - https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")
- Option 2: Use command line: `openssl rand -base64 32`
- Option 3: Use any random string generator (at least 32 characters)

**Example Value:**
```
sk_live_51H3x4mpl3_k3y_f0r_jwt_s3cur1ty_2024_random_string_12345
```

**Important Notes:**
- Must be at least 32 characters long
- Should be random and unique
- Never share this secret with anyone
- Use a different secret for production vs development

**Quick Generate:** You can use this format:
```
my_food_delivery_app_jwt_secret_key_2024_$(openssl rand -hex 16)
```

---

### 3. NODE_ENV

**Key:** `NODE_ENV`

**Value:**
```
production
```

**Important Notes:**
- Always use `production` for deployed apps
- This tells Node.js to run in production mode

---

## 📋 Optional Environment Variables (Add These Later)

### 4. PORT (Optional - Render Sets This Automatically)

**Key:** `PORT`

**Value:**
```
10000
```

**Note:** Render automatically sets the PORT, so you usually don't need this. But if you want to specify it, use `10000`.

---

### 5. ALLOWED_ORIGINS (Add After Deploying Frontend)

**Key:** `ALLOWED_ORIGINS`

**How to Get the Value:**
1. Deploy your frontend to Vercel first
2. Get your frontend URL (e.g., `https://food-delivery-app.vercel.app`)
3. Get your admin panel URL (e.g., `https://food-delivery-admin.vercel.app`)
4. Combine them with commas (no spaces)

**Example Value:**
```
https://food-delivery-app.vercel.app,https://food-delivery-admin.vercel.app
```

**Important Notes:**
- Add this AFTER you deploy frontend and admin panel
- Use comma to separate multiple URLs
- NO SPACES between URLs
- Must include `https://`
- URLs must match exactly (case-sensitive)

---

## 📝 Complete Example - All Variables

Here's what your Environment Variables tab should look like in Render:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fooddelivery?retryWrites=true&w=majority` |
| `JWT_SECRET` | `my_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters_12345` |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGINS` | `https://your-frontend.vercel.app,https://your-admin.vercel.app` |

---

## 🎬 Step-by-Step Instructions

### Step 1: Add MONGODB_URI
1. Click **"Add Environment Variable"**
2. **Key:** `MONGODB_URI`
3. **Value:** Your MongoDB connection string (from MongoDB Atlas)
4. Click **"Save Changes"**

### Step 2: Add JWT_SECRET
1. Click **"Add Environment Variable"** again
2. **Key:** `JWT_SECRET`
3. **Value:** Your generated secret key (32+ characters)
4. Click **"Save Changes"**

### Step 3: Add NODE_ENV
1. Click **"Add Environment Variable"** again
2. **Key:** `NODE_ENV`
3. **Value:** `production`
4. Click **"Save Changes"**

### Step 4: (Optional) Add ALLOWED_ORIGINS
1. After deploying frontend, click **"Add Environment Variable"**
2. **Key:** `ALLOWED_ORIGINS`
3. **Value:** Your Vercel URLs (comma-separated)
4. Click **"Save Changes"**

---

## 🔍 How to Verify Your Environment Variables

1. Go to your Render service dashboard
2. Click on **"Environment"** tab
3. You should see all your variables listed
4. Click on **"Manual Deploy"** → **"Deploy latest commit"** to apply changes

---

## ⚠️ Common Mistakes to Avoid

1. ❌ **Don't include quotes** around values (Render adds them automatically)
2. ❌ **Don't add spaces** in ALLOWED_ORIGINS between URLs
3. ❌ **Don't forget to replace** `<password>` and `<dbname>` in MONGODB_URI
4. ❌ **Don't use short JWT_SECRET** (must be 32+ characters)
5. ❌ **Don't commit secrets** to GitHub (use environment variables only)

---

## 🔐 Security Tips

1. ✅ Use strong, random JWT secrets
2. ✅ Never share your environment variables
3. ✅ Use different secrets for development and production
4. ✅ Regularly rotate your JWT_SECRET
5. ✅ Keep your MongoDB password strong

---

## 🐛 Troubleshooting

### "Database connection failed"
- ✅ Check MONGODB_URI format
- ✅ Verify password is correct (no special characters need encoding)
- ✅ Check MongoDB network access (should allow 0.0.0.0/0)
- ✅ Verify database name in connection string

### "JWT verification failed"
- ✅ Check JWT_SECRET is set correctly
- ✅ Verify JWT_SECRET is long enough (32+ characters)
- ✅ Make sure there are no extra spaces

### "CORS errors"
- ✅ Add ALLOWED_ORIGINS with your frontend URLs
- ✅ Verify URLs match exactly (including https://)
- ✅ Check for typos in URLs
- ✅ Redeploy after adding ALLOWED_ORIGINS

---

## 📞 Quick Reference

**Required Variables:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Random secret key (32+ characters)
- `NODE_ENV` - Set to `production`

**Optional Variables:**
- `PORT` - Usually not needed (Render sets automatically)
- `ALLOWED_ORIGINS` - Add after deploying frontend

---

## ✅ Checklist

Before deploying, make sure you have:
- [ ] MONGODB_URI added (with correct connection string)
- [ ] JWT_SECRET added (32+ characters, random)
- [ ] NODE_ENV added (set to `production`)
- [ ] All variables saved
- [ ] Service redeployed after adding variables

---

**That's it! Your environment variables are now configured! 🎉**

