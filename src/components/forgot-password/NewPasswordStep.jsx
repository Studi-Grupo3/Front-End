// src/components/NewPasswordStep.jsx
import { MdOutlineEmail } from "react-icons/md";

const NewPasswordStep = ({ newPassword, confirmPassword, setNewPassword, setConfirmPassword, handleResetPassword }) => (
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
);

export default NewPasswordStep;
