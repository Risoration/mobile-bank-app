import dotenv from 'dotenv';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

dotenv.config();

// Determine Plaid environment based on PLAID_ENV variable
const getPlaidEnvironment = () => {
  const env = process.env.PLAID_ENV || 'sandbox';

  switch (env) {
    case 'production':
      return PlaidEnvironments.production;
    case 'development':
      return PlaidEnvironments.development;
    case 'sandbox':
    default:
      return PlaidEnvironments.sandbox;
  }
};

const config = new Configuration({
  basePath: getPlaidEnvironment(),
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

console.log(`🔐 Plaid environment: ${process.env.PLAID_ENV || 'sandbox'}`);

export const client = new PlaidApi(config);
