//EXPO & REACT
import { Center, NativeBaseProvider, StatusBar } from 'native-base'

//STYLE
import { THEME } from './src/styles/theme'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

//COMPONENTE
import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="gray.900">
        {fontsLoaded ? <SignIn /> : <Loading />}
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
      </Center>
    </NativeBaseProvider>
  )
}