//EXPO & REACT
import { NativeBaseProvider, StatusBar } from 'native-base'

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

//SCREENS
import { Routes } from './src/routes'

//CONTEXT
import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}