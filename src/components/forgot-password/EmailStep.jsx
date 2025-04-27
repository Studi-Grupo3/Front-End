// src/components/forgot-password/EmailStep.jsx
import { MdOutlineEmail } from "react-icons/md";
import LoadingButton from "../ui/LoadingButton";
import { useEmailVerificationContext } from "../../context/EmailVerificationContext"; // vamos usar um context simples para pegar o loading

const EmailStep = ({ email, setEmail, handleSendCode }) => {
  const { loading } = useEmailVerificationContext();

  return (
    <form onSubmit={handleSendCode} className="flex flex-col justify-evenly items-center h-full w-full">
      <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
        <MdOutlineEmail className="text-[#3970B7] text-3xl" />
      </div>

      <h1 className="text-[20px] font-bold text-center">Redefinir sua senha</h1>
      <p className="text-center text-sm text-[#ffffff] px-6">
        Insira seu endereço de e-mail e enviaremos um link para redefinir sua senha.
      </p>

      <label className="flex flex-col w-75 md:w-80 gap-1 mt-4">
        <span className="text-left text-sm font-medium text-white">Endereço de e-mail</span>
        <input
          type="email"
          required
          className="rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <LoadingButton isLoading={loading.sendCode} type="submit" className="mt-6">
        Enviar link de redefinição
      </LoadingButton>
    </form>
  );
};

export default EmailStep;
