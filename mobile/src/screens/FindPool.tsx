//NATIVE BASE
import { Text, VStack } from 'native-base'

//COMPONENTE
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function FindPool() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" backButton/>

      <VStack mt={8} mx={3} alignItems="center">
        <Text color="white" my={8} textAlign="center" fontSize="xl" fontFamily="heading">
          Encontre um bolão através de seu código único
        </Text>

        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button fontWeight={700} title='buscar bolão' />
      </VStack>
    </VStack>
  )
}
