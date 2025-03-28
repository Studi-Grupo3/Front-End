import { apiFetch } from "./api";

export const paymentService = {
  async createPayment(paymentData) {
    const isBoleto = paymentData.paymentMethodId === "bolbradesco";
    const isPix = paymentData.paymentMethodId === "pix";

    if (!isBoleto && !isPix && !paymentData.token) {
      throw new Error("❌ Erro: Token do cartão ausente! O pagamento não será processado.");
    }

    console.log("📤 Enviando pagamento ao backend...", paymentData);

    return apiFetch("/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
  },
};
