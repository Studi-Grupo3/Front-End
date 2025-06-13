import React, { useState, useEffect } from 'react';

export default function Pagamento({ data, onUpdate, onNext }) {
  const [step, setStep] = useState('dados');
  const [paymentMethod, setPaymentMethod] = useState(
    data.pagamento.method || 'credito'
  );
  const [cep, setCep] = useState(data.endereco.cep || '');
  const [endereco, setEndereco] = useState({ ...data.endereco });

  useEffect(() => {
    onUpdate({ endereco: { ...endereco, cep } });
  }, [endereco, cep]);

  const handleCepChange = async e => {
    const inputCep = e.target.value.replace(/\D/g, '');
    setCep(inputCep);
    if (inputCep.length === 8) {
      try {
        const resp = await fetch(
          `https://viacep.com.br/ws/${inputCep}/json/`
        );
        const json = await resp.json();
        if (!json.erro) {
          setEndereco(prev => ({
            ...prev,
            rua: json.logradouro,
            bairro: json.bairro,
            cidade: json.localidade,
            estado: json.uf,
          }));
        } else alert('CEP não encontrado.');
      } catch {
        alert('Erro ao buscar CEP.');
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: checkout form */}
      <div className="flex-1 bg-white rounded-md shadow p-6 space-y-6">
        {/* Step tabs */}
        <div className="flex space-x-4">
          {['dados', 'endereco', 'pagamento'].map(item => (
            <button
              key={item}
              className={`px-4 py-2 ${
                step === item
                  ? 'border-b-2 border-[#3970B7] text-[#3970B7] font-semibold cursor-pointer'
                  : 'text-gray-500 cursor-pointer'
              }`}
              onClick={() => setStep(item)}
            >
              {item === 'dados'
                ? 'Dados pessoais'
                : item === 'endereco'
                ? 'Endereço'
                : 'Pagamento'}
            </button>
          ))}
        </div>

        {/* Forms */}
        {step === 'dados' && (
          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Nome completo</label>
              <input
                type="text"
                value={data.personal.nome || ''}
                onChange={e =>
                  onUpdate({ personal: { ...data.personal, nome: e.target.value } })
                }
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={data.personal.email || ''}
                onChange={e =>
                  onUpdate({ personal: { ...data.personal, email: e.target.value } })
                }
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">CPF</label>
              <input
                type="text"
                value={data.personal.cpf || ''}
                onChange={e =>
                  onUpdate({ personal: { ...data.personal, cpf: e.target.value } })
                }
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Telefone</label>
              <input
                type="text"
                value={data.personal.telefone || ''}
                onChange={e =>
                  onUpdate({ personal: { ...data.personal, telefone: e.target.value } })
                }
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 bg-[#3970B7] text-white rounded-md"
              onClick={() => setStep('endereco')}
            >
              Continuar
            </button>
          </form>
        )}

        {step === 'endereco' && (
          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">CEP</label>
              <input
                type="text"
                value={cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep}
                onChange={handleCepChange}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Rua</label>
              <input
                type="text"
                value={endereco.rua || ''}
                onChange={e => setEndereco(prev => ({ ...prev, rua: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Número</label>
                <input
                  type="text"
                  value={endereco.numero || ''}
                  onChange={e => setEndereco(prev => ({ ...prev, numero: e.target.value }))}
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">Complemento</label>
                <input
                  type="text"
                  value={endereco.complemento || ''}
                  onChange={e => setEndereco(prev => ({ ...prev, complemento: e.target.value }))}
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600">Bairro</label>
              <input
                type="text"
                value={endereco.bairro || ''}
                onChange={e => setEndereco(prev => ({ ...prev, bairro: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Cidade</label>
                <input
                  type="text"
                  value={endereco.cidade || ''}
                  onChange={e => setEndereco(prev => ({ ...prev, cidade: e.target.value }))}
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">Estado</label>
                <input
                  type="text"
                  value={endereco.estado || ''}
                  onChange={e => setEndereco(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
            </div>
            <button
              type="button"
              className="w-full py-2 bg-[#3970B7] text-white rounded-md"
              onClick={() => setStep('pagamento')}
            >
              Continuar
            </button>
          </form>
        )}

        {step === 'pagamento' && (
          <form className="space-y-4">
            <div className="flex gap-4">
              {['credito', 'debito'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method);
                    onUpdate({ pagamento: { ...data.pagamento, method } });
                  }}
                  className={`flex-1 p-2 border rounded-md text-sm ${
                    paymentMethod === method
                      ? 'border-[#3970B7] text-[#3970B7] font-semibold cursor-pointer'
                      : 'border-gray-300 text-gray-500 cursor-pointer'
                  }`}
                >
                  {method === 'credito' ? 'Cartão de Crédito' : 'Cartão de Débito'}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Número do Cartão</label>
                <input
                  type="text"
                  value={data.pagamento.numero || ''}
                  onChange={e =>
                    onUpdate({ pagamento: { ...data.pagamento, numero: e.target.value } })
                  }
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-600">Validade</label>
                  <input
                    type="text"
                    value={data.pagamento.validade || ''}
                    onChange={e =>
                      onUpdate({ pagamento: { ...data.pagamento, validade: e.target.value } })
                    }
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600">CVV</label>
                  <input
                    type="text"
                    value={data.pagamento.cvv || ''}
                    onChange={e =>
                      onUpdate({ pagamento: { ...data.pagamento, cvv: e.target.value } })
                    }
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Nome no Cartão</label>
                <input
                  type="text"
                  value={data.pagamento.nomeCartao || ''}
                  onChange={e =>
                    onUpdate({ pagamento: { ...data.pagamento, nomeCartao: e.target.value } })
                  }
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
              <button
                type="button"
                className="w-full py-2 bg-[#3970B7] text-white rounded-md cursor-pointer"
                onClick={onNext}
              >
                Finalizar Pagamento
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right: mock order summary */}
      <aside className="w-full lg:w-96 bg-white rounded-md shadow p-6 space-y-4">
        <h2 className="text-lg font-bold mb-4 bg-yellow-100 p-2 rounded">Resumo do Pedido</h2>
        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Curso de Inglês</p>
              <p className="text-xs text-gray-500">Aula de 1h30min</p>
            </div>
            <span className="font-semibold">R$ 99,90</span>
          </div>
          {/* Item 2 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Plano Mensal - Ciências</p>
              <p className="text-xs text-gray-500">4 semanas</p>
            </div>
            <span className="font-semibold">R$ 99,90</span>
          </div>
        </div>
        {/* Coupon */}
        <div className="mt-4">
          <label className="block text-sm text-[#3970B7] mb-1">Cupom de desconto</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Digite o código" className="flex-1 p-2 border rounded-md text-sm" />
            <button className="px-4 py-2 border border-[#3970B7] text-[#3970B7] rounded-md text-sm cursor-pointer">Aplicar</button>
          </div>
        </div>
        {/* Totals */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>R$ 199,80</span></div>
          <div className="flex justify-between text-green-600"><span>Desconto</span><span>R$ 0,00</span></div>
          <div className="flex justify-between font-bold text-base"><span>Total</span><span>R$ 199,80</span></div>
        </div>
      </aside>
    </div>
  );
}