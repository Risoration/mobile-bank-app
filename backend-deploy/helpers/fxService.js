import axios from 'axios';

let cachedRates = null;
let lastFetched = null;

export async function getExchangeRates(base = 'GBP') {
  const now = Date.now();
  if (cachedRates && lastFetched && now - lastFetched < 3600000) {
    return cachedRates; //reuse if rates were cached less than an hour ago
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${base}`;
  const { data } = await axios.get(url);

  cachedRates = data.rates;
  lastFetched = now;
  return cachedRates;
}

export async function convertCurrency(amount, fromCurrency, targetCurrency) {
  if (fromCurrency === targetCurrency) {
    return amount;
  }

  const rates = await getExchangeRates(fromCurrency);
  const rate = rates[targetCurrency];
  if (!rate) {
    throw new Error(`Unsupported target currency: ${targetCurrency}`);
  }

  return amount * rate;
}
