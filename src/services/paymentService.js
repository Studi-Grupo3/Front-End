import { api } from './provider/api';
import { createPaymentMock } from '../mocks/paymentsMock';

const isMock = import.meta.env.VITE_PAYMENT_MOCK === 'true';

const create = (data) => {
  const { paymentMethodId, token } = data;
  const isBoleto = paymentMethodId === 'bolbradesco';
  const isPix = paymentMethodId === 'pix';
  if (!isBoleto && !isPix && !token) {
    throw new Error('❌ Erro: Token do cartão ausente!');
  }

  console.log('📤 Enviando pagamento ao backend...', data);

  if (isMock) return createPaymentMock(data);

  return api.post('/payments', data).then(res => res.data);
};

// Export both the original name and the alias expected by hooks
export const paymentService = {
  create,
  createPayment: create,
};