//REACT
import { FormEvent, useState } from 'react';
//NEXT
import Image from 'next/image';

//IMG
import logo from '../assets/logo.svg';
import cellPhone from '../assets/cellphones.png'
import avatars from '../assets/avatares.png'
import checkIcon from '../assets/icon.svg'

//AXIOS
import { API } from '../lib/axios';

interface HomeProps {
  poolCount: number
  guessesCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {

  const [textOfInput, setTextOfInput] = useState<string>('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await API.post('pools', {
        title: textOfInput
      })  

      const { code } = response.data
      await navigator.clipboard.writeText(code)
      setTextOfInput('')

      alert(`Bolão criado com sucesso, código copiado para a área de transferência. Seu código é: ${code}`)

    } catch (error) {
      alert('Falha ao cria o bolão')
      console.log(error)

    } finally {
      alert(`Muito Obrigado`)
    }
  }

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
            +{props.usersCount} 
          </span>
          pessoas ja estão usando
        </strong>
      </div>

      <div className='mb-8'>
        <form onSubmit={createPool} className='mb-4 flex gap-2 text-sm'>
          <input 
            className='py-4 px-6 flex-grow rounded-sm bg-slate-950 border border-gray-850' type="text" required 
            placeholder='Qual o nome do seu bolão?' 
            name='NameOfPool'
            onChange={event => setTextOfInput(event.target.value)}
            value={textOfInput}
          />
          <button className='py-4 px-6 font-bold bg-yellow-450 rounded-sm text-black uppercase hover:bg-yellow-400' type='submit'>criar meu bolão</button>
        </form>
        <p className='text-gray-450 w-4/5 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
      </div>

      <footer className='flex justify-between pt-8 border-t border-gray-600'>
        <div className='flex gap-6 items-center'>
          <Image quality={100} src={checkIcon} alt='icone de check'/>
          <div className='flex flex-col'>
            <span className='font-bold'>+{props.poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>

        <div className='w-px h-14 bg-gray-600'/>

        <div className='flex items-center gap-6'>
          <Image quality={100} src={checkIcon} alt='icone de check'/>
          <div className='flex flex-col'>
            <span className='font-bold'>+{props.guessesCount}</span>
            <span>Palpites Enviados</span>
          </div>
        </div>
      </footer>
    </main>
    <Image quality={100} src={cellPhone} alt="Imagem com aplicativo mobile" />
   </div>
  )
}

export const getStaticProps = async () => {
  
  const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    API.get('pools/count'),
    API.get('guesses/count'),
    API.get('users/count')
  ])
  
  return {
    props: {
      poolCount: poolCountResponse.data.countPools,
      guessesCount: guessesCountResponse.data.countGuesses,
      usersCount: usersCountResponse.data.countUsers
    },

    revalidate: 600 //10 minutos... Após rodar a build com o back end rodando ele apenas ira chamar a API a cada 60s
  }
}