//REACT
import { useState } from 'react'
import { ScrollView } from 'native-base'
//NATIVE BASE
import { Text, VStack, useToast } from 'native-base'
//COMPONENTE
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import Logo from '../assets/logo.svg'
//BACKEND
import { API } from '../services/api'

export function NewPool() {
  const [pollName, setPollName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { show } = useToast()

  async function handleCreatePoll() {
    if(!pollName.trim()){
      return show({
        title: 'Informe um nome para o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)
      
      await API.post('/pools', {
        title: pollName
      })
      show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

    } catch (error) {

      console.log(error)
      show({
        title: 'Não foi possivel criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
      setPollName('')
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar meu bolão" />
      <ScrollView>
        <VStack mt={8} mx={3} alignItems="center">
          <Logo />
          <Text color="white" my={8} textAlign="center" fontSize="xl" fontFamily="heading">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </Text>

          <Input 
            mb={2} 
            placeholder="Qual o nome do seu bolão?" 
            onChangeText={setPollName}
            value={pollName}
            isRequired
          /> 
          <Button onPress={handleCreatePoll} title='Criar Bolão' isLoading={isLoading}/>

          <Text mt={2} color='gray.200' textAlign='center'>
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
          </Text>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

