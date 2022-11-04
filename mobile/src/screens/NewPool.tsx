//NATIVE BASE
import { Text, VStack } from 'native-base'

//COMPONENTE
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import Logo from '../assets/logo.svg'

export function NewPool() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar meu bolão" />

      <VStack mt={8} mx={3} alignItems="center">
        <Logo />
        <Text color="white" my={8} textAlign="center" fontSize="xl" fontFamily="heading">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Text>

        <Input mb={2} placeholder="Qual o nome do seu bolão?" />
        <Button title='Criar Bolão'/>

        <Text mt={2} color='gray.200' textAlign='center'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
