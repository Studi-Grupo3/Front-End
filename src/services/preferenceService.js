import { api } from './provider/api';
import { createPreferenceMock } from '../mocks/paymentsMock';

const isMock = import.meta.env.VITE_PAYMENT_MOCK === 'true';

const create = (amount, payerEmail) => {
  if (isMock) return createPreferenceMock(amount, payerEmail);
  return api.post('/payments/preference', { amount, payer_email: payerEmail }).then(res => res.data);
};

// Export both the original name used here and the alias expected by hooks
export const preferenceService = {
  create,
  createPreference: create,
};