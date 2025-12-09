import { useState } from "react";
import { paymentService } from "../../services/paymentService";

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async (paymentData) => {
    const isBoleto = paymentData.payment_method_id === "bolbradesco";
    const isPix = paymentData.payment_method_id === "pix";

    // 📌 Apenas cartão de crédito precisa do token
    if (!isBoleto && !isPix && !paymentData.token) {
      console.error(
        "❌ Erro: Token do cartão ausente! O pagamento não será enviado."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      return await paymentService.create(paymentData);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPayment,
  };
};
