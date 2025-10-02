import { client } from '../plaidClient.js';
import User from '../models/user.js';

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
