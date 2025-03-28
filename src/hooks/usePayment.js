import { useState } from "react";
import { paymentService } from "../services/paymentService";

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async (paymentData) => {
    const isBoleto = paymentData.paymentMethodId === "bolbradesco";
    const isPix = paymentData.paymentMethodId === "pix";

    if (!isBoleto && !isPix && !paymentData.token) {
      console.error("❌ Erro: Token do cartão ausente! O pagamento não será enviado.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      return await paymentService.createPayment(paymentData);
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
