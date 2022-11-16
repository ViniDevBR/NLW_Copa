//NATIVE BASE
import { Center, Text, Icon } from 'native-base'
//COMPONENTE
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons'
//HOOK
import { useAuth } from '../hooks/useAuth';



export function SignIn() {
  const { signIn, isUserLoading } = useAuth()


  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={400} height={45} />
      <Button
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md'/>}
        title='ENTRAR COM O GOOGLE' 
        type='secondary'
        onPress={signIn}
        marginTop={50}
        marginBottom={5}
        isLoading={isUserLoading}
        _loading={{ _spinner: {color: "white"}}}
      />
      <Text color="gray.200" fontSize='sm' width={280} textAlign='center' fontFamily='heading'>
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
