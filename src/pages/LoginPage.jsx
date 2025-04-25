import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { authService } from '../services/authService';
import AlertMessage from '../components/AlertMessage';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.login(credentials);

      setSuccess(`Bem-vindo, ${response.username || response.email || 'usuário'}!`);

      setTimeout(() => {
        if (response.role === 'STUDENT') {
          navigate('/aluno/inicio');
        } else if (response.role === 'TEACHER') {
          navigate('/dashboard/professores');
        } else if (response.role === 'ADMIN') {
          navigate('/dashboard');
        } else {
          setError('Role de usuário desconhecida. Contate o suporte.');
        }
      }, 2000);

    } catch (err) {
      console.error("Erro ao tentar logar:", err);
      setError('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavbarHome />

      {error && (
        <AlertMessage
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <AlertMessage
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}

      <main
        className="h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${Imagem})` }}
      >
        <section className="h-full w-full md:h-120 md:w-110 bg-[#3970B7] py-3 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white">
          <form
            className="flex flex-col justify-evenly items-center h-full w-full md:h-full md:w-full"
            onSubmit={handleLogin}
          >
            <h1 className="text-[25px] font-bold">Entrar</h1>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">E-mail</span>
              <input
                className="rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 text-black text-xs pl-3"
                type="email"
                placeholder="seu@email.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </label>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <div className="flex justify-between">
                <span className="font-bold text-xs">Senha</span>
                <span className="font-bold text-xs text-[#FECB0A] hover:underline">
                  <a href="">Esqueceu a senha?</a>
                </span>
              </div>
              <div className="relative">
                <input
                  className="w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" />
                  ) : (
                    <EyeIcon className="hover:cursor-pointer w-5 h-5" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm"
            >
              Entrar
            </button>

            <div className="relative flex items-center my-6">
              <div className="flex-1 border w-65 md:w-70 border-white"></div>
              <div className="text-[#64748B] text-center w-8 h-6 bg-white mx-2 ">
                OU
              </div>
              <div className="flex-1 border border-white"></div>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-white text-black font-normal cursor-pointer w-75 md:w-80 h-10 text-sm">
              <FcGoogle className="text-2xl" />
              Continuar com Google
            </button>

            <span className="text-xs font-bold">
              Não possui uma conta?{' '}
              <a className="text-[#FECB0A] hover:underline" href="">
                Cadastre-se
              </a>
            </span>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
