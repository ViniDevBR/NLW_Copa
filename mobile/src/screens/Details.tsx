//REACT
import { useEffect, useState } from "react";
import { Share } from 'react-native';
//NATIVE BASE
import { useToast, VStack, HStack } from "native-base";
//COMPONENTES
import { Header } from "../components/Header";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
//NAVIGATION
import { useRoute } from "@react-navigation/native";
import { Loading } from "../components/Loading";
//BACKEND
import { API } from "../services/api";

interface RouteParams {
  id: string
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);

  const route = useRoute();
  const { show } = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)
      const response = await API.get(`/pools/${id}`);
      setPoolDetails(response.data.pool)

    } catch (error) {
      console.log(error);
      show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
      
    } finally {
      setIsLoading(false);
    }
  }
  
  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }
  
  useEffect(() => {
    fetchPoolDetails()
  },[id])
  
  if(isLoading){
    return (
      <Loading />
    )
  }

  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title={poolDetails.title} backButton shareButton onShare={handleCodeShare}/>

      {
        poolDetails._count?.participants > 0 ? 
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={8}>
            <Option 
              title='Seus palpites' 
              isSelected={optionSelected === 'guesses'} 
              onPress={() => setOptionSelected('guesses')}
            />
            <Option 
              title='Ranking do grupo' 
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>

        : <EmptyMyPoolList code={poolDetails.code} />
      }
    </VStack>

  )
}