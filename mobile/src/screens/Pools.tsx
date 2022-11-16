//REACT
import { useState, useCallback } from 'react'
//NATIVE BASE
import { VStack, Icon, useToast, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons';
//COMPONENTE
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { PoolCard, PoolCardProps } from '../components/PoolCard';
//NAVIGATION
import { useNavigation, useFocusEffect } from '@react-navigation/native';
//BACKEND
import { API } from '../services/api';
import { Loading } from '../components/Loading';
import { EmptyPoolList } from '../components/EmptyPoolList';


export function Pools() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [polls, setPolls] = useState<PoolCardProps[]>([])
  const { navigate } = useNavigation()
  const { show } = useToast()

  async function fetchPolls(){
    try {
      setIsLoading(true)
      const response = await API.get('/pools')
      setPolls(response.data.pools)

    } catch (error) {
      console.log(error)
      show({
        title: 'Não foi possivel listar os bolões que voce participa!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
     setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fetchPolls()
  },[]))
  console.log(polls)
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={8} mx={3} alignItems="center"  borderBottomWidth={1} borderBottomColor='gray.600' mb={4} pb={4}>
        <Button
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md'/>} 
          fontWeight={700} 
          title='buscar bolão por código'
          onPress={() => navigate('Find')}
        />
      </VStack>
      
      { isLoading ? <Loading /> :
        
        <FlatList
          mx={3}
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PoolCard 
              onPress={() => navigate('Details', { id: item.id })}
              data={item}
            />)}
          ListEmptyComponent={<EmptyPoolList/>}
          _contentContainerStyle= {{ pb: 40 }}
          showsVerticalScrollIndicator={false}
        />
      }
    </VStack>
  )
}
