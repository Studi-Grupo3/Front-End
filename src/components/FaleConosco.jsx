const FaleConosco = () => {
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

      <form className="w-full max-w-md space-y-4">
        {/* Nome */}
        <div>
          <label className="block mb-1 text-gray-700">Nome</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block mb-1 text-gray-700">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Celular */}
        <div>
          <label className="block mb-1 text-gray-700">Celular</label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            className="w-full bg-white border border-black rounded-md px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Mensagem */}
        <div>
          <label className="block mb-1 text-gray-700">Mensagem</label>
          <textarea
            placeholder="Escreva sua mensagem aqui..."
            className="w-full bg-white border border-black rounded-md px-3 py-2 h-28 resize-none focus:outline-none"
          />
        </div>

        {/* Botão Enviar */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-40 bg-yellow-400 text-black font-semibold py-2 rounded-md border border-black hover:bg-yellow-500 transition cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaleConosco;
