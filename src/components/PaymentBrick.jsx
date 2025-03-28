import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePayments } from "../hooks/usePayments";
import { useValidatePaymentProps } from "../hooks/payments/useValidateProps";
import { useScriptLoader } from "../hooks/payments/useScriptLoader";
import { useInitializeBrick } from "../hooks/payments/useInitializeBrick";

const PaymentBrick = ({ publicKey, preferenceId, onPaymentSuccess, onPaymentError }) => {
  const { createPayment, loading, error } = usePayments();

  useValidatePaymentProps({ publicKey, preferenceId, onPaymentSuccess, onPaymentError });

  const isScriptLoaded = useScriptLoader("https://sdk.mercadopago.com/js/v2");

  const { initializeBrick } = useInitializeBrick({
    publicKey,
    preferenceId,
    createPayment,
    onPaymentSuccess,
    onPaymentError,
  });

  const [hasInitialized, setHasInitialized] = useState(false); 

  useEffect(() => {
    if (isScriptLoaded && !hasInitialized) {
      initializeBrick();
      setHasInitialized(true); 
    }
  }, [isScriptLoaded, initializeBrick, hasInitialized]);

  return (
    <div id="paymentSection">
      <div id="paymentBrick_container" style={{ width: "100%", maxWidth: "600px", height: "100%" }} />
      {loading && <p>Processando pagamento...</p>}
      {error && <p style={{ color: "red" }}>Erro: {error.message}</p>}
      {!isScriptLoaded && <p>Carregando recursos de pagamento...</p>}
    </div>
  );
};

PaymentBrick.propTypes = {
  publicKey: PropTypes.string.isRequired,
  preferenceId: PropTypes.string.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};

export default PaymentBrick;
