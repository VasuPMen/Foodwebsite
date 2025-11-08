# 🔧 Fix Render Deployment Error - Root Directory Issue

## Problem
Render is looking for `package.json` in the wrong location because the **Root Directory** is not set correctly.

**Error:**
```
npm error path /opt/render/project/src/package.json
npm error errno -2
npm error enoent Could not read package.json
```

## ✅ Solution: Set Root Directory to `Backend`

### Step 1: Go to Render Dashboard
1. Go to https://dashboard.render.com/
2. Click on your service (or create a new one)

### Step 2: Update Settings
1. Click on **"Settings"** tab (in the left sidebar)
2. Scroll down to **"Build & Deploy"** section
3. Find **"Root Directory"** field
4. Enter: `Backend`
5. Click **"Save Changes"**

### Step 3: Verify Build Settings
Make sure these settings are correct:

- **Root Directory:** `Backend` ✅
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Node Version:** `22.16.0` (or leave default)

### Step 4: Redeploy
1. Go to **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete

---

## 📋 Complete Render Configuration

Here's the complete configuration you need in Render:

| Setting | Value |
|---------|-------|
| **Name** | `food-delivery-backend` (or your choice) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `Backend` ⬅️ **THIS IS IMPORTANT!** |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Auto-Deploy** | `Yes` (optional) |

---

## 🔍 How to Check if Root Directory is Set

1. Go to your Render service
2. Click on **"Settings"** tab
3. Look for **"Root Directory"** in **"Build & Deploy"** section
4. It should show: `Backend`

If it's empty or shows `.` or `/`, that's the problem!

---

## 📝 Step-by-Step Fix

### If You're Creating a New Service:

1. **New** → **Web Service**
2. Connect your GitHub repository
3. **Configure the service:**
   - Name: `food-delivery-backend`
   - Region: Choose closest
   - Branch: `main`
   - **Root Directory: `Backend`** ⬅️ Set this!
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add Environment Variables (see RENDER_ENVIRONMENT_VARIABLES.md)
5. Click **"Create Web Service"**

### If Service Already Exists:

1. Go to your service dashboard
2. Click **"Settings"** tab
3. Scroll to **"Build & Deploy"**
4. Find **"Root Directory"**
5. Change it to: `Backend`
6. Click **"Save Changes"**
7. Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ After Fixing Root Directory

Once you set the Root Directory to `Backend`, Render will:
- ✅ Look for `package.json` in the `Backend` folder
- ✅ Run `npm install` in the `Backend` folder
- ✅ Find `server.js` in the `Backend` folder
- ✅ Start your server correctly

---

## 🐛 Still Having Issues?

### Check Your Repository Structure
Make sure your GitHub repository has this structure:
```
Food-Delivery/
  ├── Backend/
  │   ├── package.json  ⬅️ This file must exist
  │   ├── server.js
  │   ├── config/
  │   ├── controllers/
  │   └── ...
  ├── Frontend/
  └── Admin/
```

### Verify package.json Exists
1. Go to your GitHub repository
2. Navigate to `Backend` folder
3. Make sure `package.json` exists there

### Check Build Logs
After setting Root Directory, check the build logs:
- Should show: `Running build command 'npm install'...`
- Should show: `Installing dependencies...`
- Should NOT show: `Could not read package.json`

---

## 📸 Visual Guide

**Wrong Configuration:**
```
Root Directory: (empty or .)
❌ Render looks in: /opt/render/project/src/
❌ Error: package.json not found
```

**Correct Configuration:**
```
Root Directory: Backend
✅ Render looks in: /opt/render/project/src/Backend/
✅ Finds: Backend/package.json
✅ Success!
```

---

## 🎯 Quick Fix Checklist

- [ ] Go to Render Dashboard
- [ ] Click on your service
- [ ] Go to Settings tab
- [ ] Set Root Directory to `Backend`
- [ ] Save changes
- [ ] Redeploy service
- [ ] Check build logs for success

---

**After setting Root Directory to `Backend`, your deployment should work! 🚀**

