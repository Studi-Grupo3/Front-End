import { api } from './provider/api';

export const preferenceService = {
  create: (amount, payerEmail) => {
    // TODO: Mudar para valor dinâmico (amount) quando estiver validado
    const amountToTest = 100;
    return api.post('/preferences', { amount: amountToTest, payer_email: payerEmail }).then(res => res.data);
  },
};