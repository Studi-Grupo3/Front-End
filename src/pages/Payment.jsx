import { useState } from "react";
import NavbarPanel from "../components/NavbarPanel";
import { Link } from "react-router-dom";

export default function Pagamento() {
  const [step, setStep] = useState("dados");
  const [paymentMethod, setPaymentMethod] = useState("credito");

  return (
    <>
      <NavbarPanel />

      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden text-xs">

        <div className="w-full max-w-6xl text-gray-500 text-sm  mt-14 mx-auto">
          <nav className="text-xs sm:text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex flex-wrap items-center space-x-2">
              <li><Link to="/" className="hover:underline">Detalhes</Link></li>
              <li>›</li>
              <li><Link to="/class-model" className="hover:underline">Modelo de Aula</Link></li>
              <li>›</li>
              <li><Link to="/choose-professor" className="hover:underline">Professor</Link></li>
              <li>›</li>
              <li><Link to="/agendamentos" className="hover:underline">Agendamento</Link></li>
              <li>›</li>
              <li className="text-blue-600 font-medium">Pagamento</li>
            </ol>
          </nav>
        </div>

        
        <div className="w-full text-center">
          <h1 className="text-blue-600 text-2xl font-bold">Pagamento</h1>
        </div>
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mt-8 overflow-hidden mx-auto flex-1">
          
          <div className="flex-1 bg-white rounded-md shadow p-6 overflow-y-auto">
            <h2 className="text-lg font-bold mb-6">Finalizar compra</h2>

            
            <div className="flex flex-col sm:flex-row mb-6 border-b">
              {["dados", "endereco", "pagamento"].map((item) => (
                <button
                  key={item}
                  className={`w-full sm:w-auto flex-1 p-2 text-center ${step === item
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-500"
                  }`}
                  onClick={() => setStep(item)}
                >
                  {item === "dados" ? "Dados pessoais" : item === "endereco" ? "Endereço" : "Pagamento"}
                </button>
              ))}
            </div>

            
            {step === "dados" && (
              <form className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm">Nome completo</label>
                  <input type="text" placeholder="Digite seu nome completo" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input type="email" placeholder="seu@email.com" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Telefone</label>
                  <input type="text" placeholder="(00) 00000-0000" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>

                <button type="button" className="bg-blue-600 text-white rounded-md w-full py-2 mt-4">
                  Continuar
                </button>
              </form>
            )}

            {step === "endereco" && (
              <form className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm">CEP</label>
                  <input type="text" placeholder="00000-000" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Rua</label>
                  <input type="text" placeholder="Rua Exemplo" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Número</label>
                  <input type="text" placeholder="123" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Complemento</label>
                  <input type="text" placeholder="Apartamento, bloco, etc." className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Bairro</label>
                  <input type="text" placeholder="Bairro Exemplo" className="w-full p-2 border rounded-md mt-1 text-sm" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-gray-600 text-sm">Cidade</label>
                    <input type="text" placeholder="Cidade" className="w-full p-2 border rounded-md mt-1 text-sm" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-600 text-sm">Estado</label>
                    <input type="text" placeholder="UF" className="w-full p-2 border rounded-md mt-1 text-sm" />
                  </div>
                </div>

                <button type="button" className="bg-blue-600 text-white rounded-md w-full py-2 mt-4">
                  Continuar
                </button>
              </form>
            )}

            {step === "pagamento" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {["credito", "debito"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`flex-1 p-2 border rounded-md text-sm ${paymentMethod === method ? "border-blue-600 text-blue-600 font-semibold" : "border-gray-300 text-gray-500"}`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method === "credito" ? "Cartão de Crédito" : "Cartão de Débito"}
                    </button>
                  ))}
                </div>

                {(paymentMethod === "credito" || paymentMethod === "debito") && (
                  <form className="space-y-4 mt-4">
                    <div>
                      <label className="text-gray-600 text-sm">Número do Cartão</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-2 border rounded-md mt-1 text-sm" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-gray-600 text-sm">Validade</label>
                        <input type="text" placeholder="MM/AA" className="w-full p-2 border rounded-md mt-1 text-sm" />
                      </div>
                      <div className="flex-1">
                        <label className="text-gray-600 text-sm">CVV</label>
                        <input type="text" placeholder="123" className="w-full p-2 border rounded-md mt-1 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-600 text-sm">Nome no Cartão</label>
                      <input type="text" placeholder="Nome impresso no cartão" className="w-full p-2 border rounded-md mt-1 text-sm" />
                    </div>

                    <button type="button" className="bg-blue-600 text-white rounded-md w-full py-2 mt-4">
                      Finalizar Pagamento
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          
          <div className="w-full lg:w-96 bg-white rounded-md shadow p-6 overflow-y-auto">
            <h2 className="text-lg font-bold mb-6 bg-yellow-100 p-2 rounded-md">Resumo do Pedido</h2>

            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-md">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 4v16h14V4H5zm2 2h10v12H7V6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Curso de Inglês</p>
                  <p className="text-xs text-gray-500">Aula de 1h30min</p>
                </div>
                <p className="text-blue-600 text-sm font-semibold">R$ 99,90</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-2 rounded-md">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3" />
                    <path d="M5 12a7 7 0 1114 0A7 7 0 015 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Plano Mensal - Ciências</p>
                  <p className="text-xs text-gray-500">Plano de 4 semanas</p>
                </div>
                <p className="text-blue-600 text-sm font-semibold">R$ 99,90</p>
              </div>
            </div>

            
            <div className="mt-6">
              <p className="text-sm text-blue-600 font-semibold mb-2">Cupom de desconto</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="Digite o código" className="flex-1 p-2 border rounded-md text-sm" />
                <button className="bg-white border border-blue-600 text-blue-600 rounded-md px-4 py-2 text-sm">Aplicar</button>
              </div>
            </div>

            
            <div className="border-t mt-6 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">R$ 199,80</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Desconto</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span className="text-blue-600">R$ 199,80</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
