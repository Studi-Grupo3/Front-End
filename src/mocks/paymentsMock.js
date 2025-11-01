// Mock implementation for payments to allow local UI testing without MercadoPago
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export async function createPreferenceMock(amount, payerEmail) {
  await wait(300); // simulate network latency
  return { preferenceId: `MOCK_PREF_${Date.now()}` };
}

export async function createPaymentMock(paymentData) {
  await wait(500);

  // Basic validation to mimic backend rules
  const isBoleto = paymentData.paymentMethodId === 'bolbradesco';
  const isPix = paymentData.paymentMethodId === 'pix';

  if (!isBoleto && !isPix && !paymentData.token) {
    const err = new Error('Mock error: token ausente para pagamento com cartão');
    err.status = 400;
    throw err;
  }

  // Return a fake payment object similar to MercadoPago's response
  return {
    id: `MOCK_PAY_${Date.now()}`,
    status: 'approved',
    payment_method_id: paymentData.paymentMethodId,
    transaction_amount: paymentData.transactionAmount,
    description: paymentData.description,
  };
}

export default {
  createPreferenceMock,
  createPaymentMock,
};
