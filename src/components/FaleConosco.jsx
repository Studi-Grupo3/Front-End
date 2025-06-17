import React, { useState } from "react";
import { contactService } from "../services/contactService"; 
import { showAlert } from "../components/ShowAlert"; // ajuste o caminho conforme sua estrutura

export function FaleConosco() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Função para formatar telefone enquanto digita: "(11) 96378-8421"
  function formatPhone(value) {
    const digits = value.replace(/\D/g, "").substring(0, 11);
    const len = digits.length;
    if (len === 0) return "";
    if (len < 3) {
      return "(" + digits;
    }
    if (len < 7) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    }
    if (len <= 10) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`;
    }
    // 11 dígitos
    return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
  }

  // Validação local
  const validate = () => {
    const errs = {};
    if (!nome.trim()) errs.nome = "Nome é obrigatório";
    if (!email.trim()) {
      errs.email = "E-mail é obrigatório";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = "E-mail inválido";
      }
    }
    if (!mensagem.trim()) errs.mensagem = "Mensagem é obrigatória";
    if (celular) {
      const digits = celular.replace(/\D/g, "");
      if (digits.length < 10) {
        errs.celular = "Telefone incompleto";
      }
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showAlert({ title: 'Erro', text: 'Corrija os erros antes de enviar.', icon: 'error' });
      return;
    }

    const payload = {
      nome: nome.trim(),
      email: email.trim(),
      mensagem: mensagem.trim(),
    };
    if (celular) payload.celular = celular;

    setLoading(true);
    try {
      const result = await contactService.send(payload);
      showAlert({ title: 'Sucesso', text: result.message || 'Enviado com sucesso!', icon: 'success' });
      setNome("");
      setEmail("");
      setCelular("");
      setMensagem("");
      setErrors({});
    } catch (err) {
      if (err.validation) {
        setErrors(err.validation);
        showAlert({ title: 'Erro', text: 'Corrija os erros antes de enviar.', icon: 'error' });
      } else {
        console.error(err);
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Erro ao enviar. Tente novamente mais tarde.";
        showAlert({ title: 'Erro', text: msg, icon: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contato"
      className="min-h-[90vh] flex flex-col items-center justify-center bg-[#F8F8F8] px-4"
    >
      {/* Título em #3970B7 */}
      <h2 className="text-3xl font-bold text-[#3970B7] mb-2">Fale Conosco</h2>
      <p className="text-center text-gray-600 mb-8">
        Tem dúvidas ou quer saber mais sobre nossos serviços?
        <br />
        Entre em contato conosco!
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Nome */}
        <div>
          <label className="block mb-1 text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
          />
          {errors.nome && (
            <p className="text-red-600 text-sm mt-1">{errors.nome}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label className="block mb-1 text-gray-700">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Celular */}
        <div>
          <label className="block mb-1 text-gray-700">Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setCelular(formatted);
            }}
            placeholder="(00) 00000-0000"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
            maxLength={15}
          />
          {errors.celular && (
            <p className="text-red-600 text-sm mt-1">{errors.celular}</p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label className="block mb-1 text-gray-700">Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            className="w-full bg-white border border-black rounded-md px-3 py-2 h-28 resize-none focus:outline-none"
          />
          {errors.mensagem && (
            <p className="text-red-600 text-sm mt-1">{errors.mensagem}</p>
          )}
        </div>

        {/* Botão Enviar com loading */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-40 flex items-center justify-center bg-yellow-400 text-black font-semibold py-2 rounded-md border border-black transition cursor-pointer
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FaleConosco;
