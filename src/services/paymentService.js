import { api } from './provider/api';

export const paymentService = {
  create: (data) => {
    const { paymentMethodId, token } = data;
    const isBoleto = paymentMethodId === 'bolbradesco';
    const isPix = paymentMethodId === 'pix';
    if (!isBoleto && !isPix && !token) {
      throw new Error('❌ Erro: Token do cartão ausente!');
    }
    console.log('📤 Enviando pagamento ao backend...', data);
    return api.post('/payments', data).then(res => res.data);
  },
};