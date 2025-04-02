import NavbarHome from '../components/NavbarHome';
import Imagem from '../assets/imagem-fundo.svg'


const RegisterPage = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <NavbarHome />
            <main className='h-screen w-screen bg-no-repeat bg-cover bg-center flex justify-center items-center text-[50px]' style={{ backgroundImage: `url(${Imagem})` }}>

                <section className='flex flex-col justify-evenly items-center h-[80%] w-[30%] bg-[#3970B7] border-10 border-[#FECB0A] text-white' style={{ borderRadius: "120px" }}>

                    <h1 className='text-8xl  font-bold'>Crie uma conta</h1>

                    <form className='flex flex-col justify-evenly h-[80%] w-[70%]'>

                        <label className='flex flex-col'>
                            <span>
                                Nome Completo:
                            </span>
                            <input type="text" className='bg-white' />
                        </label>

                        <label className='flex flex-col'>
                            <span>
                                E-mail:
                            </span>
                            <input type="text" className='bg-white'/>
                        </label>

                        <label className='flex flex-col'>
                            <span>
                                Senha:
                            </span>
                            <input type="text" className='bg-white'/>
                        </label>

                        <label className='flex flex-col'>
                            <span>
                                Confirmar Senha:
                            </span>
                            <input type="text" className='bg-white'/>
                        </label>

                        <label className='flex flex-row items-center gap-5 h-[10%]'>
                            <input type="checkbox" className='h-5 w-5'/> 
                            <span className='text-[30px]'>I agree to the Terms of Service and Privacy Policy </span>
                        </label>

                        <button className="flex items-center justify-center h-[150px] w-[100%] gap-5 rounded-2xl bg-[#FECB0A] text-black font-semibold cursor-pointer">Cadastrar</button>

                    </form>

                </section>

            </main>
        </div>
    );
};

export default RegisterPage;