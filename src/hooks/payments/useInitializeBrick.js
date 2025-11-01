import { useRef, useCallback, useState } from "react";

export const useInitializeBrick = ({ publicKey, preferenceId, createPayment, onPaymentSuccess, onPaymentError }) => {
  const brickInstance = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeBrick = useCallback(async () => {
    if (!window.MercadoPago) {
      console.error("❌ Erro: MercadoPago SDK não carregado.");
      return;
    }

    const container = document.getElementById("paymentBrick_container");

    if (brickInstance.current || (container && container.childNodes.length > 0) || isInitialized) {
      console.log("🛑 Brick já foi inicializado. Ignorando...");
      return;
    }

    const mp = new window.MercadoPago(publicKey, { locale: "pt-BR" });
    const bricksBuilder = mp.bricks();

    try {
      console.log("🛠️ Inicializando Brick...");
      brickInstance.current = await bricksBuilder.create("payment", "paymentBrick_container", {
        initialization: {
          amount: 100.0,
          preferenceId,
          payer: {
            firstName: "Cliente",
            lastName: "Teste",
            email: "cliente@email.com",
          },
        },
        customization: {
          visual: { style: { theme: "default" } },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            bankTransfer: ["pix"],
            maxInstallments: 1,
          },
        },
        callbacks: {
          onReady: () => {
            console.log("✅ Brick de pagamento pronto.");
            setIsInitialized(true);
          },
          onSubmit: async ({ formData }) => {
            try {
              console.log("💳 Dados do pagamento recebidos:", formData);

              const isBoleto = formData.payment_method_id === "bolbradesco";
              const isPix = formData.payment_method_id === "pix";

              // ⚠️ Cartão de crédito precisa de token, mas boleto e PIX não
              if (!isBoleto && !isPix && !formData.token) {
                throw new Error("❌ ERRO: Token do cartão não foi gerado!");
              }

              // Map Brick formData to the backend DTO shape (PaymentRequestDTO)
              const payer = {
                email: formData.payer?.email || (formData.payer && formData.payer.email),
                firstName: formData.payer?.first_name || formData.payer?.firstName || "Cliente",
                identification:
                  formData.payer?.identification || formData.payer?.identification || { type: "CPF", number: "12345678909" },
                // Map address fields (backend requires address: streetName, streetNumber, zipCode)
                address: {
                  streetName:
                    formData.payer?.address?.street_name || formData.payer?.address?.streetName || "Rua Exemplo",
                  streetNumber:
                    formData.payer?.address?.street_number || formData.payer?.address?.streetNumber || "0",
                  zipCode:
                    formData.payer?.address?.zip_code || formData.payer?.address?.zipCode || "00000000",
                },
              };

              const payload = {
                transactionAmount: formData.transaction_amount || formData.transactionAmount,
                description: formData.description || "Compra via Brick",
                installments: formData.installments || formData.installments_count || 1,
                paymentMethodId: formData.payment_method_id || formData.paymentMethodId,
                payer,
              };

              // 📌 Apenas cartão precisa de token
              if (!isBoleto && !isPix) {
                // cartão precisa de token
                payload.token = formData.token || formData.card?.token || formData.token_id;
              }

              console.log("📤 Enviando pagamento ao backend...", payload);
              const result = await createPayment(payload);
              console.log("✅ Pagamento aprovado:", result);
              onPaymentSuccess(result);
            } catch (err) {
              console.error("❌ Erro ao processar pagamento:", err);
              onPaymentError(err.message);
            }
          },
          onError: (error) => {
            console.error("🛑 Erro no Brick:", error);
            onPaymentError(error);
          },
        },
      });
    } catch (error) {
      console.error("❌ Erro ao inicializar o Brick:", error);
    }
  }, [publicKey, preferenceId, createPayment, onPaymentSuccess, onPaymentError, isInitialized]);

  return { initializeBrick };
};
