import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NavbarHome from '../components/NavbarHome';
import EmailStep from '../components/forgot-password/EmailStep';
import CodeVerificationStep from '../components/forgot-password/CodeVerificationStep';
import NewPasswordStep from '../components/forgot-password/NewPasswordStep';
import Imagem from '../assets/imagem-fundo.svg';
import { authService } from '../services/authService';
import { EmailVerificationProvider, useEmailVerificationContext } from '../context/EmailVerificationContext';
import { showAlert } from '../components/ShowAlert';

const EmailVerificationPageContent = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useEmailVerificationContext();

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, sendCode: true }));
    try {
      await authService.forgotPassword({ email });
      showAlert({
        title: 'Código Enviado!',
        text: "📩 Verifique seu e-mail (inclusive o spam).",
        icon: 'success'
      });
      setStep('code');
    } catch (error) {
      showAlert({
        title: 'Erro!',
        text: error.message || "Erro ao enviar código",
        icon: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, sendCode: false }));
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, verifyCode: true }));
    try {
      await authService.verifyCode({ email, code });
      showAlert({
        title: 'Sucesso!',
        text: "Código verificado. Agora defina sua nova senha.",
        icon: 'success'
      });
      setStep('new-password');
    } catch (error) {
      showAlert({
        title: 'Erro!',
        text: error.message || "Código inválido",
        icon: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, verifyCode: false }));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showAlert({
        title: 'Erro!',
        text: "As senhas não coincidem",
        icon: 'error'
      });
      return;
    }
    setLoading(prev => ({ ...prev, resetPassword: true }));
    try {
      await authService.resetPassword({ email, code, newPassword });
      showAlert({
        title: 'Senha Redefinida!',
        text: "Agora faça login novamente.",
        icon: 'success'
      });
      setTimeout(() => {
        navigate('/entrar');
      }, 2000);
    } catch (error) {
      showAlert({
        title: 'Erro!',
        text: error.message || "Erro ao redefinir senha",
        icon: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, resetPassword: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavbarHome />

      <main
        className='relative h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${Imagem})` }}
      >
        <section className='relative h-full w-full md:h-120 md:w-110 bg-[#3970B7] py-3 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white flex flex-col items-center'>

          <button
            onClick={() => {
              if (step === 'email') {
                navigate('/entrar');
              } else if (step === 'new-password') {
                setStep('code');
              } else {
                setStep('email');
              }
            }}
            className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-[#FECB0A] cursor-pointer transition-transform hover:scale-110"
          >
            <ArrowLeft size={28} />
          </button>


          {step === 'email' && (
            <EmailStep email={email} setEmail={setEmail} handleSendCode={handleSendCode} />
          )}
          {step === 'code' && (
            <CodeVerificationStep
              email={email}
              code={code}
              setCode={setCode}
              handleVerifyCode={handleVerifyCode}
              handleSendCode={handleSendCode}
              setStep={setStep}
            />
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

const EmailVerificationPage = () => (
  <EmailVerificationProvider>
    <EmailVerificationPageContent />
  </EmailVerificationProvider>
);

export default EmailVerificationPage;
