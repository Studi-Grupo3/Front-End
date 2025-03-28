import { useState } from "react";
import PaymentBrick from "../components/PaymentBrick";
import { usePreferenceId } from "../hooks/usePreferenceId";

const CheckoutPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const publicKey = "TEST-16b57b12-3740-4b69-be8f-787cb873db07"; 
  const { preferenceId, loading, error } = usePreferenceId(100, "cliente@teste.com");

  return (
    <div>
      <h1>Finalizar Compra</h1>
      {loading && <p>Carregando preferência de pagamento...</p>}
      {error && <p style={{ color: "red" }}>Erro ao obter preferência: {error}</p>}
      {preferenceId && (
        <PaymentBrick
          publicKey={publicKey}
          preferenceId={preferenceId}
          onPaymentSuccess={(response) => setPaymentStatus(`✅ Pagamento aprovado! ID: ${response.id}`)}
          onPaymentError={(error) => setPaymentStatus(`❌ Erro no pagamento: ${error}`)}
        />
      )}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default CheckoutPage;
