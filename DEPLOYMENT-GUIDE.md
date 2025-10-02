# 🚀 Deployment Guide: Separate Backend + Vercel Frontend

This guide covers deploying the Revolve Bank app with a **separate backend** on Render and **frontend** on Vercel.

## 📁 Repository Structure

```
revolve-bank-app/
├── backend-deploy/     ← Deploy to Render
├── frontend/           ← Deploy to Vercel
├── backend/            ← Original backend (for reference)
└── api/               ← Serverless functions (not needed)
```

## 🎯 Step 1: Deploy Backend to Render

### 1.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### 1.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo: `Risoration/revolve-bank`
3. **Configure Service:**
   - **Name**: `revolve-bank-api`
   - **Root Directory**: `backend-deploy`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: `18` (or newer)

### 1.3 Environment Variables

In Render dashboard → **Environment** tab, add:

```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/revolve-bank
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
NODE_ENV=production
PORT=10000
```

### 1.4 Deploy

Click **"Create Web Service"** and wait ~5-10 minutes.

**Note the URL**: `https://revolve-bank-api.onrender.com` (or similar)

## 🎯 Step 2: Update Frontend API Configuration

Once Render deployment is complete, update the API URL:

### 2.1 Update API Config

In `frontend/src/config/api.ts`, replace the placeholder URL:

```typescript
// Production: use Render backend
return 'https://your-actual-render-url.onrender.com';
```

### 2.2 Commit and Push

```bash
git add frontend/src/config/api.ts
git commit -m "Update frontend to use Render backend URL"
git push origin main
```

Vercel will automatically redeploy the frontend.

## 🎯 Step 3: Clean Up Vercel (Optional)

Since we're using external backend, you can simplify Vercel config:

### 3.1 Update vercel.json

```json
{
  "installCommand": "npm install && cd frontend && npm install --include=dev",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist"
```

Remove the `functions` and `rewrites` sections since we're not using Vercel's API routes.

### 3.2 Remove API Directory

```bash
rm -rf api/
git commit -m "Remove unused API serverless functions"
```

## ✅ Testing

### Backend Health Check

Visit: `https://your-backend.onrender.com/api/`
Should return: `{"message": "API is working!", "status": "success", ...}`

### Frontend Login

1. Visit: `https://revolve-bank.vercel.app`
2. Try to login
3. Should now call the Render backend instead of 404 errors

## 🔧 Troubleshooting

### Backend Won't Start

- Check Render logs for error messages
- Verify environment variables are set correctly
- Check MongoDB Atlas network access (add 0.0.0.0/0)

### CORS Errors

Ensure `allowedOrigins` in `backend-deploy/server.js` includes:

- `https://revolve-bank.vercel.app`
- Your Render backend URL

### Frontend Still Shows Localhost

Check `frontend/src/config/api.ts` points to Render URL in production.

## 🎉 Benefits

- ✅ **Simpler**: No serverless function complexity
- ✅ **Faster**: Express + Mongoose work as expected
- ✅ **Cost-effective**: Render free tier + Vercel free tier
- ✅ **Reliable**: Traditional Node.js hosting
- ✅ **Easy to debug**: Standard server logs and debugging

## 🛠️ Development

For local development, keep the existing setup:

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`
- API calls go to `localhost:5000` automatically

## 📝 Future Improvements

- Add database connection pooling
- Implement Redis caching
- Set up CI/CD pipelines
- Add monitoring and alerts
- Use a custom domain for the backend

---

This architecture gives you the best of both worlds: **Vercel's frontend deployment** with **Render's reliable backend hosting**.
