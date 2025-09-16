import express, { response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import User from './models/user.js';

// Load .env file from the backend directory
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON data
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

//Plaid configuration for bank account connection and data retrieval
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(config);

//create a link token
app.post('/api/create_link_token', async (req, res) => {
  try {
    const { userId } = req.body || {};
    const response = await client.linkTokenCreate({
      user: { client_user_id: String(userId || 'anonymous') },
      client_name: 'Revlove',
      products: ['transactions', 'auth', 'identity'],
      country_codes: ['GB'],
      language: 'en',
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Plaid error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

//exchange public token for access token
app.post('/api/exchange_public_token', async (req, res) => {
  const { public_token, userId } = req.body;
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;
    //store access token securely for that user
    if (userId) {
      await User.findByIdAndUpdate(userId, { accessToken: access_token });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('Plaid error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Connect to database and then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

app.get('/api/accounts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.query;
    //fetch user's access token from database
    const userDoc = await User.findById(userId).select('accessToken');
    const accessToken = userDoc?.accessToken;

    const response = await client.accountsGet({ access_token: accessToken });
    const accounts = response.data.accounts || [];
    const filtered = accountId
      ? accounts.filter((a) => a.account_id === accountId)
      : accounts;
    res.json({ accounts: filtered });
  } catch (error) {
    console.error(
      'Plaid accounts error:',
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId, start_date, end_date } = req.query;

    const userDoc = await User.findById(userId).select('accessToken');
    const accessToken = userDoc?.accessToken;

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: start_date || '2024-01-01',
      end_date: end_date || '2024-12-31',
      options: accountId ? { account_ids: [accountId] } : undefined,
    });

    res.json({ transactions: response.data.transactions });
  } catch (error) {
    console.error(
      'Plaid transactions error:',
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

startServer();
