// API configuration
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Development: use localhost backend
    return 'http://localhost:5000';
  } else {
    // Production: API on same domain
    return window.location.origin;
  }
};

const API_BASE_URL = getApiBaseUrl();

const API_CONFIG = {
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

// Log the API configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 Development mode - API Base URL:', API_BASE_URL);
} else {
  console.log('🚀 Production mode - API Base URL:', API_BASE_URL);
}

export { API_CONFIG };
