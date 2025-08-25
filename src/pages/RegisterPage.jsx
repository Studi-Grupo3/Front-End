import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { studentService } from '../services/studentService';
import LoadingButton from '../components/ui/LoadingButton';
import { showAlert } from '../components/ShowAlert';

const RegisterPage = () => {
  const validatePasswordRules = (pwd) => {
  const msgs = [];
  if (!pwd || pwd.length < 8) msgs.push('• Pelo menos 6 caracteres');
  if (!/[A-Z]/.test(pwd)) msgs.push('• Uma letra maiúscula');
  if (!/[a-z]/.test(pwd)) msgs.push('• Uma letra minúscula');
  if (!/[0-9]/.test(pwd)) msgs.push('• Um número');
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) msgs.push('• Um caractere especial');
  // if (/(.)\1{2,}/.test(pwd)) msgs.push('Evite repetições de caracteres.');
  return msgs;
};

  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const handlePasswordChange = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
    const pwdMsgs = validatePasswordRules(value);
    setErrors((prev) => ({ ...prev, password: pwdMsgs.join(' ') }));
    if (formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== formData.confirmPassword ? 'As senhas não coincidem.' : '',
      }));
    }
  };

  const handleConfirmChange = (value) => {
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        value !== formData.password ? 'As senhas não coincidem.' : '',
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pwdMsgs = validatePasswordRules(formData.password);
    const confirmMsg = formData.password !== formData.confirmPassword ? 'As senhas não coincidem.' : '';
    setErrors({ password: pwdMsgs.join(' '), confirmPassword: confirmMsg });
    setTouched({ password: true, confirmPassword: true });
    if (pwdMsgs.length > 0 || confirmMsg) {
      showAlert({
        title: 'Erro!',
        text: pwdMsgs.length > 0 ? pwdMsgs.join(' ') : confirmMsg,
        icon: 'error'
      });
      setLoading(false);
      return;
    }
    try {
      const { name, email, password } = formData;

      const response = await studentService.create({ name, email, password });
      showAlert({
        title: 'Conta criada!',
        text: `Bem-vindo, ${response.username || response.name || 'usuário'}! 🎉`,
        icon: 'success'
      });
      setTimeout(() => {
        navigate('/entrar');
      }, 2000);
    } catch (err) {
      console.error("Erro ao tentar cadastrar:", err);
      showAlert({
        title: 'Erro!',
        text: "Erro ao realizar cadastro. Tente novamente",
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  const hasPasswordError = Boolean(errors.password);
  const hasConfirmError = Boolean(errors.confirmPassword);
  const disableSubmit = loading || hasPasswordError || hasConfirmError || !formData.password || !formData.confirmPassword;

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
            onSubmit={handleRegister}
          >
            <h1 className="text-[25px] font-bold mb-2">Crie uma conta</h1>

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
                  aria-invalid={hasPasswordError}
                  aria-describedby="password-error"
                  className={`w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3 ${hasPasswordError && touched.password ? 'border-2 border-red-500' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => handleBlur('password')}
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

              <p
                id="password-error"
                className={`text-xs mt-1 ${touched.password && errors.password ? 'text-red-300' : 'text-white/80'}`}
              >
                {touched.password && errors.password ? errors.password : 'A senha deve ter pelo menos 6 caracteres.'}
              </p>
            </label>

            <label className="flex flex-col w-75 md:w-80 gap-1">
              <span className="font-bold text-xs">Confirmar Senha</span>
              <div className="relative">
                <input
                  aria-invalid={hasConfirmError}
                  aria-describedby="confirm-error"
                  className={`w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3 ${hasConfirmError && touched.confirmPassword ? 'border-2 border-red-500' : ''}`}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                />
              {touched.confirmPassword && errors.confirmPassword && (
                <p id="confirm-error" className="text-xs text-red-300 mt-1">{errors.confirmPassword}</p>
              )}
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
              disabled={disableSubmit}
              className={`rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm mt-2 ${disableSubmit ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              Cadastrar
            </LoadingButton>

            <p className="text-sm mt-2">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => navigate('/entrar')}
                className="font-bold text-[#FECB0A] hover:underline cursor-pointer"
              >
                Clique aqui
              </button>
            </p>

          </form>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
