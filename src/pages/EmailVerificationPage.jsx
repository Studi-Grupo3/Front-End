// src/pages/EmailVerificationPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import { PopupMessage } from '../components/PopupMessage';
import EmailStep from '../components/forgot-password/EmailStep';
import CodeVerificationStep from '../components/forgot-password/CodeVerificationStep';
import NewPasswordStep from '../components/forgot-password/NewPasswordStep';
import Imagem from '../assets/imagem-fundo.svg';
import { authService } from '../services/authService';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword({ email });
      setMessage("Código enviado para seu e-mail! 📩 Verifique sua caixa de entrada e spam.");
      setMessageType("success");
      setStep('code');
    } catch (error) {
      setMessage(error.message || "Erro ao enviar código ❌");
      setMessageType("error");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await authService.verifyCode({ email, code });
      setMessage("Código verificado com sucesso ✅ Agora defina sua nova senha.");
      setMessageType("success");
      setStep('new-password');
    } catch (error) {
      setMessage(error.message || "Código inválido ❌");
      setMessageType("error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem ❌");
      setMessageType("error");
      return;
    }

    try {
      await authService.resetPassword({ email, code, newPassword });
      setMessage("Senha redefinida com sucesso! 🎉 Faça login novamente.");
      setMessageType("success");
      setTimeout(() => {
        setMessage('');
        navigate('/entrar');
      }, 3000);
    } catch (error) {
      setMessage(error.message || "Erro ao redefinir senha ❌");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavbarHome />

      {message && (
        <PopupMessage
          message={message}
          type={messageType}
          onClose={() => setMessage('')}
        />
      )}

      <main
        className='h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${Imagem})` }}
      >
        <section className='h-full w-full md:h-120 md:w-110 bg-[#3970B7] py-3 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white'>
          {step === 'email' && (
            <EmailStep email={email} setEmail={setEmail} handleSendCode={handleSendCode} />
          )}
          {step === 'code' && (
            <CodeVerificationStep email={email} code={code} setCode={setCode} handleVerifyCode={handleVerifyCode} handleSendCode={handleSendCode} />
          )}
          {step === 'new-password' && (
            <NewPasswordStep
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              handleResetPassword={handleResetPassword}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default EmailVerificationPage;
