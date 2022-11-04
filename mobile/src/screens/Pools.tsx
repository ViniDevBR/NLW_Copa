//NATIVE BASE
import { Text, VStack, Icon } from 'native-base'
import { Octicons } from '@expo/vector-icons';
//COMPONENTE
import { Header } from '../components/Header'
import { Button } from '../components/Button'


export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={8} mx={3} alignItems="center"  borderBottomWidth={1} borderBottomColor='gray.600' mb={4} pb={4}>
        <Button
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md'/>} 
          fontWeight={700} 
          title='buscar bolão por código'
        />
      </VStack>

      <VStack mx={3} alignItems="center">
        <Text mt={2} color='gray.200' textAlign='center'>
          Você ainda não está participando de nenhum bolão, que tal buscar um por código ou criar um novo?
        </Text>
      </VStack>
    </VStack>
  )
}
