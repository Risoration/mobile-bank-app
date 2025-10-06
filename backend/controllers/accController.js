import { client } from '../plaidClient.js';
import User from '../models/user.js';

// Get accounts
export const getAccounts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.query;
    const userDoc = await User.findById(userId).select(
      'accessToken hiddenAccounts'
    );
    const accessToken = userDoc?.accessToken;
    const hiddenAccounts = userDoc?.hiddenAccounts || [];

    // Check if user has an access token
    if (!accessToken) {
      return res.json({
        accounts: [],
        message:
          'No bank account connected. Please connect a bank account to view accounts.',
      });
    }

    const response = await client.accountsGet({ access_token: accessToken });
    const accounts = response.data.accounts || [];

    // Filter out hidden accounts
    const visibleAccounts = accounts.filter(
      (a) => !hiddenAccounts.includes(a.account_id)
    );

    const filtered = accountId
      ? visibleAccounts.filter((a) => a.account_id === accountId)
      : visibleAccounts;

    res.json({ accounts: filtered });
  } catch (error) {
    console.error(
      'Plaid accounts error:',
      error.response?.data || error.message
    );

    // Handle specific Plaid error codes
    const errorCode = error.response?.data?.error_code;

    if (
      errorCode === 'INVALID_ACCESS_TOKEN' ||
      errorCode === 'ITEM_LOGIN_REQUIRED'
    ) {
      return res.json({
        accounts: [],
        message:
          'Your bank connection needs to be updated. Please reconnect your bank account.',
        error_code: errorCode,
      });
    }

    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Remove specific account (hide from user view)
export const removeAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    // Get user document
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize hiddenAccounts array if it doesn't exist
    if (!user.hiddenAccounts) {
      user.hiddenAccounts = [];
    }

    // Add account ID to hidden accounts list
    if (!user.hiddenAccounts.includes(accountId)) {
      user.hiddenAccounts.push(accountId);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Account hidden successfully',
    });
  } catch (error) {
    console.error('Remove account error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Restore hidden account
export const restoreAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    // Get user document
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove account ID from hidden accounts list
    if (user.hiddenAccounts && user.hiddenAccounts.includes(accountId)) {
      user.hiddenAccounts = user.hiddenAccounts.filter(
        (id) => id !== accountId
      );
      await user.save();
    }

    res.json({
      success: true,
      message: 'Account restored successfully',
    });
  } catch (error) {
    console.error('Restore account error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get hidden accounts
export const getHiddenAccounts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await User.findById(userId).select(
      'accessToken hiddenAccounts'
    );
    const accessToken = userDoc?.accessToken;
    const hiddenAccounts = userDoc?.hiddenAccounts || [];

    // Check if user has an access token
    if (!accessToken) {
      return res.json({
        accounts: [],
        message: 'No bank account connected.',
      });
    }

    const response = await client.accountsGet({ access_token: accessToken });
    const allAccounts = response.data.accounts || [];

    // Filter to only show hidden accounts
    const hiddenAccountsList = allAccounts.filter((a) =>
      hiddenAccounts.includes(a.account_id)
    );

    res.json({ accounts: hiddenAccountsList });
  } catch (error) {
    console.error(
      'Get hidden accounts error:',
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Remove entire bank connection (disconnect bank)
export const removeBankConnection = async (req, res) => {
  try {
    const { userId } = req.params;

    // Remove the access token from the user document
    await User.findByIdAndUpdate(userId, {
      $unset: { accessToken: 1, plaidCursor: 1, hiddenAccounts: 1 },
    });

    res.json({
      success: true,
      message: 'Bank connection removed successfully',
    });
  } catch (error) {
    console.error('Remove bank connection error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
