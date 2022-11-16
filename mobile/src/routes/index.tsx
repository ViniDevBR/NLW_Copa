//NATIVE BASE
import { Box } from 'native-base';
//REACT NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
//SCREENS
import { SignIn } from '../screens/SignIn';
//HOOK
import { useAuth } from '../hooks/useAuth';

export function Routes() {
  const { user } = useAuth()

  return(
    <Box flex={1} backgroundColor='gray.900'>
      <NavigationContainer>
        {user.name ? <AppRoutes/> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}