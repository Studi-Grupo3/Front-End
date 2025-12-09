import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePayments } from "../hooks/payments/usePayment";
import { useValidatePaymentProps } from "../hooks/payments/useValidateProps";
import { useScriptLoader } from "../hooks/payments/useScriptLoader";
import { useInitializeBrick } from "../hooks/payments/useInitializeBrick";

const PaymentBrick = ({
  publicKey,
  preferenceId,
  onPaymentSuccess,
  onPaymentError,
  payerAddress,
}) => {
  const { createPayment, loading, error } = usePayments();

  useValidatePaymentProps({
    publicKey,
    preferenceId,
    onPaymentSuccess,
    onPaymentError,
  });

  const isScriptLoaded = useScriptLoader(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );

  const { initializeBrick } = useInitializeBrick({
    publicKey,
    preferenceId,
    createPayment,
    onPaymentSuccess,
    onPaymentError,
    payerAddress,
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
      <div
        id="paymentBrick_container"
        style={{ width: "100%", maxWidth: "600px", height: "100%" }}
      />
    </div>
  );
};

PaymentBrick.propTypes = {
  publicKey: PropTypes.string.isRequired,
  preferenceId: PropTypes.string.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
  payerAddress: PropTypes.object,
};

export default PaymentBrick;
