import { Center, Text, VStack } from 'native-base'
import { Header } from '../components/Header'
import Logo from '../assets/logo.svg'

export function NewPool() {
  return(
    <>
      <VStack flex={1}>
        <Header title="Criar meu bolão" />
        <VStack marginY={10}>
          <Logo />
        </VStack>
        <Text color="white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Text>
      </VStack>
    </>
  )
}
