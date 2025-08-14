import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Calendar,
  CreditCard
} from 'lucide-react';
import { appointmentCreateService } from '../../services/appointmentCreateService';
import { parseDurationToMinutes } from '../../utils/date';
import { useNavigate } from 'react-router-dom';

const couponDiscounts = {
  'CUPOM20': 0.20,
  'CUPOM50': 0.50,
  'CUPOM75': 0.75
};

export default function Pagamento({ data, onUpdate, onNext }) {
  const [step, setStep] = useState('endereco');
  const [paymentMethod, setPaymentMethod] = useState(data.pagamento.method || 'credito');
  const [cep, setCep] = useState(data.endereco.cep || '');
  const [endereco, setEndereco] = useState({ ...data.endereco });
  const [loading, setLoading] = useState(false);
const [couponCode, setCouponCode] = useState(data.pagamento.cupom || '');
 const [discountPercent, setDiscountPercent] = useState(data.pagamento.descontoPercent || 0);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Cálculo local para exibir no resumo imediatamente
  const lessonDurationLocal = parseDurationToMinutes(data.duration || '');
  const totalValueLocal     = lessonDurationLocal * 1; // tarifa por minuto

  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : '';
  const timeStr = data.time || '';

  // Atualiza estado de endereço e notifica componente pai
  const updateEndereco = next => {
    setEndereco(prev => {
      const updated = typeof next === 'function' ? next(prev) : next;
      onUpdate({ endereco: { ...updated, cep } });
      return updated;
    });
  };

  const handleCepChange = async e => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setCep(onlyDigits);
    if (onlyDigits.length === 8) {
      try {
        const resp = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
        const json = await resp.json();
        if (!json.erro) {
          updateEndereco(prev => ({
            ...prev,
            rua: json.logradouro,
            bairro: json.bairro,
            cidade: json.localidade,
            estado: json.uf
          }));
        } else {
          alert('CEP não encontrado.');
        }
      } catch {
        alert('Erro ao buscar CEP.');
      }
    } else {
      // Apenas atualiza CEP manualmente
      onUpdate({ endereco: { ...endereco, cep: onlyDigits } });
    }
  };

  // Atualiza campos de pagamento ou outros sections
  const handleFieldChange = (field, value, section = 'pagamento') => {
    onUpdate({
      [section]: { ...data[section], [field]: value }
    });
  };

  const handleApplyCoupon = () => {
    onUpdate({ pagamento: { ...data.pagamento, descontoAplicado: true } });
  };

  const handleFinalize = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const lessonDuration = parseDurationToMinutes(data.duration || '');
      const ratePerMinute  = 1;
      const totalValue     = lessonDuration * ratePerMinute;

      const created = await appointmentCreateService.create({
        ...data,
        pagamento: {
          ...data.pagamento,
          lessonDuration,
          totalValue,
          method: paymentMethod
        }
      });

      navigate(`/aluno/concluido/${created.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Erro ao agendar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-4">
      <div className="flex-1 bg-white rounded-md shadow p-4 space-y-4">
        {/* Navegação de etapas */}
        <div className="flex space-x-4 text-xs">
          {['endereco', 'pagamento'].map(item => (
            <button
              key={item}
              onClick={() => setStep(item)}
              className={`px-3 py-1 ${
                step === item
                  ? 'border-b-2 border-[#3970B7] text-[#3970B7] font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {item === 'endereco' ? 'Endereço' : 'Pagamento'}
            </button>
          ))}
        </div>

        {/* Formulário de Endereço */}
        {step === 'endereco' && (
          <form className="space-y-2">
            <div>
              <label className="text-xs text-gray-600">CEP</label>
              <input
                type="text"
                value={cep.length > 5 ? `${cep.slice(0,5)}-${cep.slice(5)}` : cep}
                onChange={handleCepChange}
                className="w-full p-1 border rounded text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Rua</label>
              <input
                type="text"
                value={endereco.rua || ''}
                onChange={e => updateEndereco({ ...endereco, rua: e.target.value })}
                className="w-full p-1 border rounded text-xs"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-600">Número</label>
                <input
                  type="text"
                  value={endereco.numero || ''}
                  onChange={e => updateEndereco({ ...endereco, numero: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Complemento</label>
                <input
                  type="text"
                  value={endereco.complemento || ''}
                  onChange={e => updateEndereco({ ...endereco, complemento: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600">Bairro</label>
              <input
                type="text"
                value={endereco.bairro || ''}
                onChange={e => updateEndereco({ ...endereco, bairro: e.target.value })}
                className="w-full p-1 border rounded text-xs"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-600">Cidade</label>
                <input
                  type="text"
                  value={endereco.cidade || ''}
                  onChange={e => updateEndereco({ ...endereco, cidade: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Estado</label>
                <input
                  type="text"
                  value={endereco.estado || ''}
                  onChange={e => updateEndereco({ ...endereco, estado: e.target.value })}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep('pagamento')}
              className="w-full py-2 bg-[#3970B7] text-white rounded text-sm"
            >
              Continuar
            </button>
          </form>
        )}

        {/* Formulário de Pagamento */}
        {step === 'pagamento' && (
          <form className="space-y-3">
            <div className="flex gap-3 text-xs">
              {['credito', 'debito'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method);
                    handleFieldChange('method', method);
                  }}
                  className={`flex-1 p-1 border rounded text-xs ${
                    paymentMethod === method
                      ? 'border-[#3970B7] text-[#3970B7] font-semibold'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {method === 'credito' ? 'Cartão de Crédito' : 'Cartão de Débito'}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Número do Cartão</label>
                <input
                  type="text"
                  value={data.pagamento.numero || ''}
                  onChange={e => handleFieldChange('numero', e.target.value)}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Validade</label>
                  <input
                    type="text"
                    value={data.pagamento.validade || ''}
                    onChange={e => handleFieldChange('validade', e.target.value)}
                    className="w-full p-1 border rounded text-xs"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600">CVV</label>
                  <input
                    type="text"
                    value={data.pagamento.cvv || ''}
                    onChange={e => handleFieldChange('cvv', e.target.value)}
                    className="w-full p-1 border rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Nome no Cartão</label>
                <input
                  type="text"
                  value={data.pagamento.nomeCartao || ''}
                  onChange={e => handleFieldChange('nomeCartao', e.target.value)}
                  className="w-full p-1 border rounded text-xs"
                />
              </div>
              {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
              <button
                type="button"
                onClick={handleFinalize}
                disabled={loading}
                className="w-full py-2 bg-[#3970B7] text-white rounded text-sm"
              >
                {loading ? 'Processando...' : 'Confirmar e Agendar'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Resumo do Pedido */}
      <aside className="flex-none lg:w-1/3 bg-white rounded-md shadow-md p-4 space-y-4 border-l-4 border-yellow-300 self-start">
        <h2 className="flex items-center text-xl font-bold text-[#3970B7] space-x-2">
          <CreditCard size={20} />
          <span className="text-base">Resumo do Pedido</span>
        </h2>

        {/* Cupom de desconto */}
        <div className="space-y-1 text-sm">
          <label className="block font-medium text-gray-700">Cupom de desconto</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite o código"
              className="flex-1 p-1 border rounded text-sm"
              value={data.pagamento.cupom || ''}
              onChange={e => handleFieldChange('cupom', e.target.value)}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="px-3 py-1 bg-[#3970B7] text-white rounded text-sm cursor-pointer"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Detalhes da aula */}
        <ul className="space-y-2 text-sm">
          <li className="flex items-center space-x-2">
            <BookOpen size={16} className="text-[#3970B7]" />
            <span>{data.subject || '—'}</span>
          </li>
          <li className="flex items-center space-x-2">
            <Clock size={16} className="text-[#3970B7]" />
            <span>{data.duration || '—'}</span>
          </li>
          <li className="flex items-center space-x-2">
            <Calendar size={16} className="text-[#3970B7]" />
            <span>{dateStr || '—'}</span>
          </li>
          <li className="flex items-center space-x-2">
            <Clock size={16} className="text-[#3970B7]" />
            <span>{timeStr}</span>
          </li>
        </ul>

        <div className="border-t border-gray-200" />

        {/* Valores */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>R$ {totalValueLocal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between">
            <span>Desconto</span>
            <span className="text-green-600">
              - R$ {(data.pagamento.descontoAplicado ? data.pagamento.desconto || 0 : 0).toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-gray-200">
            <span className="font-medium">TOTAL</span>
            <span className="text-2xl font-bold text-[#3970B7]">
              R$ {(totalValueLocal - (data.pagamento.descontoAplicado ? data.pagamento.desconto || 0 : 0)).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
