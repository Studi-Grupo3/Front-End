import { useRef, useCallback, useState } from "react";

export const useInitializeBrick = ({ publicKey, preferenceId, createPayment, onPaymentSuccess, onPaymentError, payerAddress }) => {
  const brickInstance = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeBrick = useCallback(async () => {
    if (!window.MercadoPago) {
      console.error("❌ Erro: MercadoPago SDK não carregado.");
      return;
    }

    const container = document.getElementById("paymentBrick_container");
    console.log("📦 Container encontrado:", !!container);

    if (brickInstance.current || (container && container.childNodes.length > 0) || isInitialized) {
      console.log("🛑 Brick já foi inicializado. Ignorando...");
      return;
    }

    console.log("🚀 Iniciando setup do Brick...");
    const mp = new window.MercadoPago(publicKey, { locale: "pt-BR" });
    const bricksBuilder = mp.bricks();

    try {
      console.log("🛠️ Criando Brick com preferenceId:", preferenceId);
      brickInstance.current = await bricksBuilder.create("payment", "paymentBrick_container", {
        initialization: {
          amount: 100.0,
          preferenceId,

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

              const payload = {
                transaction_amount: formData.transaction_amount,
                description: "Compra via Brick",
                installments: formData.installments,
                payment_method_id: formData.payment_method_id,
                payer: {
                  email: formData.payer?.email,
                  first_name: formData.payer?.first_name || "Cliente",
                  identification: formData.payer?.identification || { type: "CPF", number: "12345678909" },
                  address: payerAddress || {
                    zip_code: "01001000",
                    street_name: "Av. Paulista",
                    street_number: "123",
                    neighborhood: "Bela Vista",
                    city: "São Paulo",
                    federal_unit: "SP"
                  }
                },
              };

              // 📌 Apenas cartão precisa de token
              if (!isBoleto && !isPix) {
                payload.token = formData.token;
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
  }, [publicKey, preferenceId, createPayment, onPaymentSuccess, onPaymentError, isInitialized, payerAddress]);

  return { initializeBrick };
};