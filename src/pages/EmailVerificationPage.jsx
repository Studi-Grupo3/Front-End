import { useState } from 'react';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import {PopupMessage} from '../components/PopupMessage';

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

            {/* Mensagem de popup */}
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
                        <form onSubmit={handleSendCode} className='flex flex-col justify-evenly items-center h-full w-full'>
                            <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
                                <MdOutlineEmail className="text-[#3970B7] text-3xl" />
                            </div>
                            <h1 className='text-[20px] font-bold'>Digite seu e-mail</h1>
                            <label className='flex flex-col w-75 md:w-80 gap-1'>
                                <input
                                    type='email'
                                    required
                                    className='rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base'
                                    placeholder='seu@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <button type='submit' className='rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm'>
                                Enviar código
                            </button>
                        </form>
                    )}

                    {step === 'code' && (
                        <form onSubmit={handleVerifyCode} className='flex flex-col justify-evenly items-center h-full w-full'>
                            <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
                                <MdOutlineEmail className="text-[#3970B7] text-3xl" />
                            </div>
                            <h1 className='text-[20px] font-bold'>Verifique seu e-mail</h1>
                            <span className='text-xs'>Enviamos um código para:</span>
                            <span className='text-xs font-semibold'>{email}</span>

                            <label className='flex flex-col w-75 md:w-80 gap-1'>
                                <input
                                    maxLength={6}
                                    className='rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base'
                                    type='text'
                                    placeholder='Digite o código de 6 dígitos'
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </label>

                            <button type='submit' className='rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm'>
                                Verificar e-mail
                            </button>

                            <span className='text-xs'>
                                Não recebeu o código?
                                <button type="button" onClick={handleSendCode} className='text-[#FECB0A] hover:underline ml-1 cursor-pointer'>
                                    Reenviar
                                </button>
                            </span>
                        </form>
                    )}

                    {step === 'new-password' && (
                        <form onSubmit={handleResetPassword} className='flex flex-col justify-evenly items-center h-full w-full'>
                            <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
                                <MdOutlineEmail className="text-[#3970B7] text-3xl" />
                            </div>
                            <h1 className='text-[20px] font-bold'>Redefinir Senha</h1>
                            <label className='flex flex-col w-75 md:w-80 gap-1'>
                                <input
                                    type='password'
                                    required
                                    className='rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base'
                                    placeholder='Nova senha'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <label className='flex flex-col w-75 md:w-80 gap-1'>
                                <input
                                    type='password'
                                    required
                                    className='rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base'
                                    placeholder='Confirme sua nova senha'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>

                            <button type='submit' className='rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm'>
                                Redefinir senha
                            </button>
                        </form>
                    )}
                </section>
            </main>
        </div>
    );
};

export default EmailVerificationPage;
