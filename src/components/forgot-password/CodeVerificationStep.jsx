import { MdOutlineEmail } from "react-icons/md";

const CodeVerificationStep = ({ email, code, setCode, handleVerifyCode, handleSendCode }) => {
  return (
    <form onSubmit={handleVerifyCode} className="flex flex-col justify-evenly items-center h-full w-full">
      <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
        <MdOutlineEmail className="text-[#3970B7] text-3xl" />
      </div>
      <h1 className="text-[20px] font-bold">Verifique seu e-mail</h1>
      <span className="text-xs">Enviamos um código para:</span>
      <span className="text-xs font-semibold">{email}</span>

      <label className="flex flex-col w-75 md:w-80 gap-1">
        <input
          maxLength={6}
          className="rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base"
          type="text"
          placeholder="Digite o código de 6 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>

      <button type="submit" className="rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm">
        Verificar e-mail
      </button>

      <span className="text-xs">
        Não recebeu o código?
        <button
          type="button"
          onClick={handleSendCode}
          className="text-[#FECB0A] hover:underline ml-1 cursor-pointer"
        >
          Reenviar
        </button>
      </span>
    </form>
  );
};

export default CodeVerificationStep;
