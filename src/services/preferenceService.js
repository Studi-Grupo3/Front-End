import { api } from './provider/api';

export const preferenceService = {
  create: (amount, payerEmail) =>
    api.post('/payments/preference', { amount, payer_email: payerEmail }).then(res => res.data),
};