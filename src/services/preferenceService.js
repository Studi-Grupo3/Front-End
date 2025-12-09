import { api } from './provider/api';

export const preferenceService = {
  create: (amount, payerEmail) => {
    return api.post('/preferences', { amount, payer_email: payerEmail }).then(res => res.data);
  },
};