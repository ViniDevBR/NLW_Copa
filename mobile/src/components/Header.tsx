//NATIVE BASE
import { useNavigation } from '@react-navigation/native'
import { Text, HStack, Box } from 'native-base'
//PHOSPHOR ICON
import { CaretLeft, Export } from 'phosphor-react-native'
//COMPONENTE
import { ButtonIcon } from './ButtonIcon'

interface HeaderProps {
  title: string
  backButton?: boolean
  shareButton?: boolean
}

export function Header({ backButton = false, shareButton = false, ...props }: HeaderProps) {
  const EmptyBoxSpace = () => <Box w={6} h={6} />
  const {navigate} = useNavigation()

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">

        {backButton ? <ButtonIcon icon={CaretLeft} onPress={() => navigate('Polls')}/> : <EmptyBoxSpace />}

        <Text textAlign="center" color="white" fontSize={16} fontFamily="medium">
          {props.title}
        </Text>

        {shareButton ? <ButtonIcon icon={Export} /> : <EmptyBoxSpace />}

      </HStack>
    </HStack>
  )
}
