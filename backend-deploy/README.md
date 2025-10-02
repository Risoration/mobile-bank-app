# Revolve Bank API

Backend API for Revolve Bank App deployed on Render.

## Environment Variables Required

Set these in your Render dashboard:

- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to "production"
- `PORT` - Automatically set by Render

## Deployment

1. Connect your GitHub repository to Render
2. Set root directory to `/backend-deploy`
3. Set environment variables in Render dashboard
4. Deploy!

## API Endpoints

- `GET /api/` - Health check
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/profile` - User profile
- And more...

## CORS Setup

This API is configured to accept requests from:

- `https://revolve-bank.vercel.app`
- Local development (`http://localhost:3000`)
