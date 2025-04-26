// src/components/EmailStep.jsx
import { MdOutlineEmail } from "react-icons/md";

const EmailStep = ({ email, setEmail, handleSendCode }) => (
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
);

export default EmailStep;
