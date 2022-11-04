//NATIVE BASE
import { Center, Text, Icon } from 'native-base'

//COMPONENTE
import Logo from '../assets/logo.svg';
import { Buttons } from '../components/Button';
import { Fontisto } from '@expo/vector-icons'

//HOOK
import { useAuth } from '../hooks/useAuth';



export function SignIn() {
  const { signIn, user } = useAuth()

  console.log(user)

  return (
    <Center flex={1} bgColor="gray.900">
      <Logo width={400} height={45} />
      <Buttons 
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md'/>}
        title='ENTRAR COM O GOOGLE' 
        type='secondary'
        onPress={signIn}
      />
      <Text color="gray.200" fontSize='sm' width={280} textAlign='center' fontFamily='heading'>
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
