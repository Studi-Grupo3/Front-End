import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { authService } from '../services/authService';
import { showAlert } from '../components/ShowAlert';
import LoadingButton from '../components/ui/LoadingButton';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(credentials);

      showAlert({
        title: 'Login realizado!',
        text: `Bem-vindo, ${response.username || response.email || 'usuário'}!`,
        icon: 'success',
      });

      setTimeout(() => {
        if (response.role === 'STUDENT') {
          navigate('/aluno/inicio');
        } else if (response.role === 'TEACHER') {
          navigate('/dashboard/professores');
        } else if (response.role === 'ADMIN') {
          navigate('/dashboard');
        } else {
          showAlert({
            title: 'Erro!',
            text: 'Role de usuário desconhecida. Contate o suporte.',
            icon: 'error',
          });
        }
      }, 2000);

    } catch (err) {
      console.error("Erro ao tentar entrar:", err);
      showAlert({
        title: 'Erro!',
        text: 'Erro ao realizar login. Verifique suas credenciais.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavbarHome />

      <main
        className="h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${Imagem})` }}
      >
        <section className="w-[90%] max-w-[400px] bg-[#3970B7] py-6 px-4 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white flex flex-col items-center">
          <form
            className="flex flex-col items-center h-full w-full md:h-full md:w-full gap-6"
            onSubmit={handleLogin}
          >
            <h1 className="text-[25px] font-bold mb-2">Entrar</h1>

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
                <span
                  className="font-bold text-xs text-[#FECB0A] hover:underline cursor-pointer"
                  onClick={() => navigate('/redefinir-senha')}
                >
                  Esqueceu a senha?
                </span>
              </div>
              <div className="relative">
                <input
                  className="w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs"
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

            <LoadingButton
              isLoading={loading}
              type="submit"
              className="rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm mt-2"
            >
              Entrar
            </LoadingButton>

            <span className="text-sm font-bold mt-2">
              Não possui uma conta?{' '}
              <a className="text-[#FECB0A] hover:underline" href="/cadastrar">
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
