import { api } from './provider/api';

const isMock = import.meta.env.VITE_PAYMENT_MOCK === 'true';

const create = (amount, payerEmail) => {
  if (isMock) {
    // simple mock response when running with VITE_PAYMENT_MOCK=true
    return Promise.resolve({ id: `pref_mock_${Date.now()}`, amount, payer_email: payerEmail });
  }

  // send to backend preference endpoint
  return api.post('/payments/preference', { amount, payer_email: payerEmail }).then(res => res.data);
};

// Export both the original name used here and the alias expected by hooks
export const preferenceService = {
  create,
  createPreference: create,
};