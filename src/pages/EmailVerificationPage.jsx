import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg';
import { MdOutlineEmail } from "react-icons/md";

const LoginPage = () => {


    return (
        <div className="flex flex-col h-screen w-screen">
            <NavbarHome />
            <main className='h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${Imagem})` }}>

                <section className='h-full w-full md:h-120 md:w-110 bg-[#3970B7] py-3 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white'>

                    <form className='flex flex-col justify-evenly items-center h-full w-full md:h-full md:w-full'>

                        <div className="w-16 h-16 bg-[#FECB0A] rounded-full flex items-center justify-center">
                            <MdOutlineEmail  className="text-[#3970B7] text-3xl" />
                        </div>

                        <h1 className='text-[20px] font-bold'>Verifique seu e-mail</h1>

                        <span className='text-xs'>Enviamos um código de verificação para</span>

                        <span className='text-xs'>Digite o código abaixo para confirmar seu e-mail</span>

                        <label className='flex flex-col w-75 md:w-80 gap-1'>
                            <input maxLength={6} className='rounded-md bg-white placeholder-[#64748B] text-center placeholder:text-xs h-10 text-black text-base' type='text' placeholder='Digite o código de 6 dígitos' />
                        </label>

                        <button className='rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm'>Verificar e-mail</button>

                        <span className='text-xs'>Não recebeu o código? <a className='text-[#FECB0A] hover:underline' href="">Reenviar</a></span>

                    </form>

                </section>

            </main>

        </div>
    )
};

export default LoginPage;