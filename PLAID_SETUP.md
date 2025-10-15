# Plaid Bank Integration Setup Guide

This guide will help you set up Plaid bank account linking in the Revolve Bank application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started with Plaid](#getting-started-with-plaid)
- [Environment Variables](#environment-variables)
- [Testing the Integration](#testing-the-integration)
- [Supported Features](#supported-features)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- A Plaid account (sign up at [plaid.com](https://plaid.com))
- Node.js 18+ installed
- MongoDB instance running
- Both backend and frontend servers running

## Getting Started with Plaid

### 1. Create a Plaid Account

1. Visit [https://dashboard.plaid.com/signup](https://dashboard.plaid.com/signup)
2. Sign up for a free account
3. Complete the email verification

### 2. Get Your API Credentials

1. Log in to the [Plaid Dashboard](https://dashboard.plaid.com/)
2. Navigate to **Team Settings** → **Keys**
3. Copy your credentials:
   - **client_id**: Your unique Plaid client identifier
   - **secret** (sandbox): Use the sandbox secret for development
   - **secret** (development): Use this for testing with real institutions (optional)
   - **secret** (production): Use this for live production environment

### 3. Enable Products

In the Plaid Dashboard:

1. Go to **Team Settings** → **API**
2. Ensure the following products are enabled:
   - ✅ **Transactions** - Access to bank transactions
   - ✅ **Auth** - Bank account and routing numbers
   - ✅ **Identity** - Account holder information

## Environment Variables

### Backend Configuration

Create or update `backend/.env` with the following variables:

```env
# MongoDB
MONGO_URL=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret

# Environment (development, sandbox, or production)
NODE_ENV=development

# Server Port
PORT=5000
```

### Frontend Configuration

The frontend uses the `API_CONFIG` from `frontend/src/config/api.ts`, which automatically detects the environment and uses the appropriate backend URL:

- **Development**: `http://localhost:5000`
- **Production**: `https://revolve-bank.onrender.com`

No additional Plaid configuration is needed on the frontend.

## Environment-Specific Setup

### Sandbox (Development/Testing)

The **Sandbox** environment is perfect for development and testing without connecting to real banks.

**Configuration:**

```javascript
// backend/plaidClient.js
basePath: PlaidEnvironments.sandbox;
```

**Test Credentials:**

- Username: `user_good`
- Password: `pass_good`
- Institution: Search for any bank name (e.g., "Chase", "Bank of America")

### Development (Real Bank Testing)

The **Development** environment allows you to test with real bank credentials but is still free.

**Configuration:**

```javascript
// backend/plaidClient.js
basePath: PlaidEnvironments.development;
```

Use your actual bank credentials for testing.

### Production (Live)

The **Production** environment is for live customer use and requires a Plaid production account.

**Configuration:**

```javascript
// backend/plaidClient.js
basePath: PlaidEnvironments.production;
```

**Important:** Production usage incurs costs. Review Plaid pricing before switching to production.

## Testing the Integration

### 1. Start the Servers

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

### 2. Link a Bank Account

1. **Register/Login** to the application
2. Navigate to the **Accounts** tab
3. Click **"+ Add Bank Account"**
4. In the Plaid Link modal:
   - Search for a bank (e.g., "Chase" in sandbox)
   - Enter test credentials:
     - Username: `user_good`
     - Password: `pass_good`
   - Select accounts to link
   - Complete the flow

### 3. Verify the Connection

After successful linking:

- You should see a success toast notification
- Your accounts will appear on the Accounts page
- Transactions will be available in the Transactions tab
- Dashboard will update with account balances

## Supported Features

### ✅ Implemented Features

- **Link Bank Accounts**: Connect banks using Plaid Link
- **View Accounts**: Display all linked bank accounts with balances
- **View Transactions**: Fetch and display transaction history
- **Sync Transactions**: Refresh transactions to get latest data
- **Disconnect Bank**: Remove bank connection and clear access tokens
- **Update Mode**: Re-authenticate when access token expires
- **Error Handling**: Graceful error handling with user-friendly messages

### API Endpoints

#### Plaid Endpoints

- `POST /api/create_link_token` - Create a Plaid Link token
- `POST /api/exchange_public_token` - Exchange public token for access token
- `GET /api/accounts/:userId` - Get user's linked accounts

#### Account Endpoints

- `GET /api/accounts/:userId` - Get visible accounts
- `GET /api/accounts/:userId/hidden` - Get hidden accounts
- `DELETE /api/accounts/:userId` - Hide an account
- `POST /api/accounts/:userId/restore` - Restore hidden account
- `DELETE /api/accounts/:userId/bank` - Disconnect bank

#### Transaction Endpoints

- `GET /api/transactions/:userId` - Get transactions with date range
- `POST /api/transactions/sync/:userId` - Sync latest transactions

## Troubleshooting

### Issue: "No token found in cookies"

**Solution:**

- Ensure cookies are enabled in your browser
- Check that `NODE_ENV=development` is set in your backend `.env`
- Verify CORS is properly configured for your frontend URL

### Issue: "ITEM_LOGIN_REQUIRED" Error

**Solution:**

- The bank connection needs to be re-authenticated
- Click the **"Update Bank Connection"** button
- This happens when the access token expires or the bank requires re-authentication

### Issue: Plaid Link doesn't open

**Solution:**

1. Check browser console for errors
2. Verify `react-plaid-link` is installed: `npm list react-plaid-link`
3. Ensure link token is being created successfully (check backend logs)
4. Verify Plaid credentials in `.env` are correct

### Issue: "Invalid credentials" error

**Solution:**

- **Sandbox**: Use test credentials (`user_good` / `pass_good`)
- **Development**: Use your actual bank credentials
- **Production**: Ensure you're using production secrets

### Issue: Accounts not appearing after linking

**Solution:**

1. Check backend logs for errors
2. Verify the access token is saved in MongoDB
3. Try clicking the refresh button in the Accounts tab
4. Check if accounts are marked as hidden

### Issue: CORS errors in browser

**Solution:**

- Verify your frontend URL is in the `allowedOrigins` array in `backend/server.js`
- Ensure `credentials: true` is set in both frontend and backend CORS config
- Check that the frontend is using `withCredentials: true` in axios requests

## Additional Resources

- [Plaid Documentation](https://plaid.com/docs/)
- [Plaid API Reference](https://plaid.com/docs/api/)
- [Plaid Link Customization](https://plaid.com/docs/link/)
- [Plaid Sandbox Testing Guide](https://plaid.com/docs/sandbox/)
- [react-plaid-link Documentation](https://github.com/plaid/react-plaid-link)

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Rotate secrets regularly** in production
3. **Use environment-specific secrets** (don't use sandbox secrets in production)
4. **Implement rate limiting** on API endpoints
5. **Validate all user inputs** before making Plaid API calls
6. **Log and monitor** Plaid API errors for security issues
7. **Use HTTPS** in production for all communications
8. **Implement proper authentication** before allowing Plaid Link access

## Production Checklist

Before going live:

- [ ] Switch to Plaid production environment
- [ ] Update `PLAID_SECRET` to production secret
- [ ] Enable production URL in Plaid Dashboard
- [ ] Set `NODE_ENV=production` in backend
- [ ] Review and configure CORS for production domains
- [ ] Set up monitoring and error tracking
- [ ] Test end-to-end flow with real bank accounts
- [ ] Implement proper logging
- [ ] Review Plaid pricing and usage limits
- [ ] Set up webhook handlers for account updates (optional)

## Support

For issues specific to:

- **Plaid API**: Contact [Plaid Support](https://dashboard.plaid.com/support)
- **Application Issues**: Check the main README.md or open an issue in the repository

---

**Last Updated:** October 2025  
**Plaid API Version:** 2020-09-14 (latest stable)
