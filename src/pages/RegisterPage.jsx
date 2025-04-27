import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { studentService } from '../services/studentService';
import AlertMessage from '../components/AlertMessage';
import LoadingButton from '../components/ui/LoadingButton'; // 👈 Importação do LoadingButton

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 Estado de loading
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      const { name, email, password } = formData;
      const response = await studentService.create({ name, email, password });

      setSuccess(`Conta criada com sucesso! Bem-vindo, ${response.username || response.name || 'usuário'}.`);

      setTimeout(() => {
        navigate('/entrar');
      }, 2000);
    } catch (err) {
      console.error("Erro ao tentar cadastrar:", err);
      setError('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
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
        <section className="h-full w-full md:h-145 md:w-120 bg-[#3970B7] py-4 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white">
          <form
            className="flex flex-col justify-evenly items-center h-full w-full md:h-full md:w-full"
            onSubmit={handleRegister}
          >
            <h1 className="text-[25px] font-bold">Crie uma conta</h1>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">Nome Completo</span>
              <input
                className="rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 text-black text-xs pl-3"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">E-mail</span>
              <input
                className="rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 text-black text-xs pl-3"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">Senha</span>
              <div className="relative">
                <input
                  className="w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
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

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">Confirmar Senha</span>
              <div className="relative">
                <input
                  className="w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
              className="rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm"
            >
              Cadastrar
            </LoadingButton>
          </form>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
