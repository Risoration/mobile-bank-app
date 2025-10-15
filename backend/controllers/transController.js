import { client } from '../plaidClient.js';
import User from '../models/user.js';

// Get transactions
export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId, start_date, end_date } = req.query;

    const userDoc = await User.findById(userId).select('accessToken');
    const accessToken = userDoc?.accessToken;

    // Check if user has an access token
    if (!accessToken) {
      return res.json({
        transactions: [],
        summary: { income: 0, expenses: 0, categories: {} },
        message:
          'No bank account connected. Please connect a bank account to view transactions.',
      });
    }

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: start_date || '2024-01-01',
      end_date: end_date || '2024-12-31',
      options: accountId ? { account_ids: [accountId] } : undefined,
    });

    const transactions = response.data.transactions;

    const income = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const categories = {};
    for (const tx of transactions) {
      const cat = tx.category?.[0] || 'Uncategorised';
      categories[cat] = (categories[cat] || 0) + tx.amount;
    }

    res.json({
      transactions,
      summary: { income, expenses, categories },
    });
  } catch (error) {
    console.error(
      'Plaid transactions error:',
      error.response?.data || error.message
    );

    // Handle specific Plaid error codes
    const errorCode = error.response?.data?.error_code;

    if (
      errorCode === 'INVALID_ACCESS_TOKEN' ||
      errorCode === 'ITEM_LOGIN_REQUIRED'
    ) {
      return res.json({
        transactions: [],
        summary: { income: 0, expenses: 0, categories: {} },
        message:
          'Your bank connection needs to be updated. Please reconnect your bank account.',
        error_code: errorCode,
      });
    }

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
