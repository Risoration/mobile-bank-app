import { client } from '../plaidClient.js';
import User from '../models/user.js';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Get transactions
export const getTransactions = async (req, res) => {
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
};

// Sync transactions
export const syncTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId, count } = req.query;

    const userDoc = await User.findById(userId).select(
      'accessToken plaidCursor'
    );
    const accessToken = userDoc?.accessToken;
    let cursor = userDoc?.plaidCursor || null;

    if (!accessToken) {
      return res.status(400).json({ error: 'Missing access token for user' });
    }

    const added = [];
    const modified = [];
    const removed = [];
    let hasMore = true;

    while (hasMore) {
      const request = {
        access_token: accessToken,
        cursor: cursor || undefined,
        count: count ? Number(count) : undefined,
        options: accountId ? { account_ids: [accountId] } : undefined,
      };

      const response = await client.transactionsSync(request);
      const data = response.data;
      added.push(...(data.added || []));
      modified.push(...(data.modified || []));
      removed.push(...(data.removed || []));
      hasMore = data.has_more;
      cursor = data.next_cursor;
    }

    await User.findByIdAndUpdate(
      userId,
      { plaidCursor: cursor },
      { new: true }
    );

    res.json({ added, modified, removed, next_cursor: cursor });
  } catch (error) {
    console.error('Plaid sync error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
