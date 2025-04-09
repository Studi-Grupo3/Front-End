import { useState } from 'react';
import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg'
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col h-screen w-screen">
            <NavbarHome />
            <main className='h-[88vh] w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${Imagem})` }}>

                <section className='h-full w-full md:h-145 md:w-120 bg-[#3970B7] py-4 md:border-4 md:border-[#FECB0A] md:rounded-3xl text-white'>

                    <form className='flex flex-col justify-evenly items-center h-full w-full md:h-full md:w-full'>

                        <h1 className='text-[25px] font-bold'>Crie uma conta</h1>

                        <label className='flex flex-col w-75 md:w-80 gap-1'>
                            <span className='font-bold text-xs'>Nome Completo</span>
                            <input className='rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 text-black text-xs pl-3' type="text" placeholder='Digite seu nome completo' />
                        </label>

                        <label className='flex flex-col w-75 md:w-80 gap-1'>
                            <span className='font-bold text-xs'>E-mail</span>
                            <input className='rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 text-black text-xs pl-3' type='email' placeholder='seu@email.com' />
                        </label>

                        <label className='flex flex-col w-75 md:w-80 gap-1'>
                            <span className='font-bold text-xs'>Senha</span>
                            <div className="relative">
                                <input
                                    className='w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-3 pr-10 text-black text-xs pl-3'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Crie uma senha'
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" /> : <EyeIcon className="hover:cursor-pointer w-5 h-5" />}
                                </button>
                            </div>
                        </label>

                        <label className='flex flex-col w-75 md:w-80 gap-3'>
                            <div className='flex flex-col gap-1'>
                                <span className='font-bold text-xs'>Confirmar Senha</span>
                                <div className="relative">
                                    <input
                                        className='w-full rounded-md bg-white placeholder-[#64748B] placeholder:text-xs h-8 px-4 pr-10 text-black text-xs pl-3'
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder='Confirme sua senha'
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" /> : <EyeIcon className="hover:cursor-pointer w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <input className='hover:cursor-pointer' type="checkbox" />
                                <span className='font-bold text-xs'>
                                    I agree the <a className='text-[#FECB0A] hover:underline' href="">Terms of Service</a> and <a className='text-[#FECB0A] hover:underline' href="">Privacy Policy</a>
                                </span>
                            </div>
                        </label>



                        <button className='rounded-lg bg-[#FECB0A] text-black font-semibold cursor-pointer w-75 md:w-80 h-10 text-sm'>Cadastrar</button>

                        <div className="relative flex items-center my-6">

                            <div className="flex-1 border w-65 md:w-80 border-white"></div>

                            <div className="text-[#64748B] text-center w-8 h-6 bg-white mx-2 ">OU</div>

                            <div className="flex-1 border border-white"></div>

                        </div>

                        <button className='flex items-center justify-center gap-2 rounded-lg bg-white text-black font-normal cursor-pointer w-75 md:w-80 h-10 text-sm'><FcGoogle className="text-2xl" />Cadastre-se pelo Google</button>

                        <span className='text-xs font-bold'>Já tem uma conta aqui? <a className='text-[#FECB0A] hover:underline' href="">Clique aqui</a></span>


                    </form>

                </section>

            </main>
        </div>
    );
};

export default RegisterPage;