//NATIVE BASE
import { Center, Text, Icon } from 'native-base'

//OTHERS
import Logo from '../assets/logo.svg';

//COMPONENTE
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons'


export function SignIn() {
  
  return (
    <Center>
      <Logo width={400} height={45} />
      <Button 
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md'/>}
        title='ENTRAR COM O GOOGLE' 
        type='secondary'
        // isLoading
      />
      <Text color="gray.200" fontSize='sm' width={280} textAlign='center' fontFamily='heading'>
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}
