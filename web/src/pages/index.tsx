//NEXT
import Image from 'next/image';

//IMG
import logo from '../assets/logo.svg';
import cellPhone from '../assets/cellphones.png'
import avatars from '../assets/avatares.png'
import checkIcon from '../assets/icon.svg'

export default function Home() {
  return (
   <div className='flex items-center gap-14 h-screen max-w-[80%] m-auto'>
    <main className='flex flex-col text-gray-100'>
      <Image quality={100} src={logo} alt='logo da NLW' className='mb-12'/>
      <h1 className='font-bold text-white text-5xl'>
      Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>

      <div className='flex items-center gap-2 my-8'>
        <Image quality={100} src={avatars} alt='avatares'/>
        <strong className='text-xl'>
          <span className='text-green-650 mr-1'>
            +12.592 
          </span>
          pessoas ja estão usando
        </strong>
      </div>

      <div className='mb-8'>
        <form className='mb-4 flex gap-2 text-sm'>
          <input className='py-4 px-6 flex-grow rounded-sm bg-slate-950 border border-gray-850' type="text" required placeholder='Qual o nome do seu bolão?'/>
          <button className='py-4 px-6 font-bold bg-yellow-450 rounded-sm text-black uppercase hover:bg-yellow-400'>criar meu bolão</button>
        </form>
        <p className='text-gray-450 w-4/5 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
      </div>

      <footer className='flex pt-8 border-t border-gray-600'>
        <div className='flex flex-grow items-center mr-10 border-r border-gray-600'>
          <Image quality={100} src={checkIcon} alt='icone de check'/>
          <div className='flex flex-col ml-3'>
            <span className='font-bold'>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>

        <div className='flex items-center flex-grow'>
          <Image quality={100} src={checkIcon} alt='icone de check'/>
          <div className='flex flex-col ml-3'>
            <span className='font-bold'>+192.847</span>
            <span>Palpites Enviados</span>
          </div>
        </div>
      </footer>
    </main>
    <Image quality={100} src={cellPhone} alt="Imagem com aplicativo mobile" />
   </div>
  )
}
