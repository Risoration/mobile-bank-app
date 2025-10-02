import { client } from '../plaidClient.js';
import User from '../models/user.js';

// Create a link token
export const createLinkToken = async (req, res) => {
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
};

// Exchange public token for access token
export const exchangePublicToken = async (req, res) => {
  const { public_token, userId } = req.body;
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;

    if (userId) {
      await User.findByIdAndUpdate(userId, { accessToken: access_token });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Plaid error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Get accounts
export const getAccounts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.query;
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
};
