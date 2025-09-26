// API configuration
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    AUTH: `${API_BASE_URL}/api`,
    USERS: `${API_BASE_URL}/api/users`,
    ACCOUNTS: `${API_BASE_URL}/api/accounts`,
    BUDGETS: `${API_BASE_URL}/api/budgets`,
    TRANSACTIONS: `${API_BASE_URL}/api/transactions`,
    PLAID: `${API_BASE_URL}/api`,
  },
};

export default API_CONFIG;
