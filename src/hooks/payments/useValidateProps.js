import { useEffect } from "react";

export const useValidatePaymentProps = ({ publicKey, preferenceId, onPaymentSuccess, onPaymentError }) => {
  useEffect(() => {
    if (!publicKey) console.error("❌ Erro: `publicKey` está ausente no PaymentBrick.");
    if (!preferenceId) console.error("❌ Erro: `preferenceId` está ausente no PaymentBrick.");
    if (typeof onPaymentSuccess !== "function") console.error("❌ Erro: `onPaymentSuccess` não é uma função.");
    if (typeof onPaymentError !== "function") console.error("❌ Erro: `onPaymentError` não é uma função.");
  }, [publicKey, preferenceId, onPaymentSuccess, onPaymentError]);
};
