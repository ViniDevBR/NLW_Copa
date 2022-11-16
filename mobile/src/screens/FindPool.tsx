//REACT
import { useState } from 'react'
//NAVIGATION
import { useNavigation } from '@react-navigation/native'
//NATIVE BASE
import { Text, VStack, useToast } from 'native-base'
//COMPONENTE
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
//BACKEND
import { API } from '../services/api'

export function FindPool() {
  const [pollCode, setPollCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { show } = useToast()
  const { navigate } = useNavigation()


  async function FindPoll() {
    try {
      setIsLoading(true)
      if (!pollCode.trim()) {
        return show({
          title: 'Informe um código para o bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      const response = await API.post('/pools/join', {
        code: pollCode
      })
      show({
        title: 'Você entrou no bolão',
        placement: 'top',
        bgColor: 'green.500'
      })
      navigate('Polls')
      
    } catch (error:any) {
      setIsLoading(false)
      console.log(error)
      if(error.response?.data?.message === 'Poll not found'){
        return show({
          title: 'Não foi possivel encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      if(error.response?.data?.message === 'Você ja é um participante'){
        return show({
          title: 'Você ja é um participante deste bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    } finally {
      setPollCode('')
      setIsLoading(false)
    }
  }
  
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" backButton/>

      <VStack mt={8} mx={3} alignItems="center">
        <Text color="white" my={8} textAlign="center" fontSize="xl" fontFamily="heading">
          Encontre um bolão através de seu código único
        </Text>

        <Input 
          value={pollCode} 
          onChangeText={setPollCode} 
          mb={2} 
          autoCapitalize='characters'
          placeholder="Qual o código do bolão?" 
        />
        <Button isLoading={isLoading} onPress={FindPoll} fontWeight={700} title='buscar bolão' />
      </VStack>
    </VStack>
  )
}
