//REACT
import { Platform } from 'react-native';

//REACT MAVIGATION
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//PHOSPHOR ICONS
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

//SCREENS
import { NewPool } from '../screens/NewPool';
import { Pools } from '../screens/Pools';

//HOOKS
import { useTheme } from 'native-base';


const {Screen, Navigator} = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()
  const size = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        backgroundColor: colors.gray[800],
        position: 'absolute',
        borderTopWidth: 0,
        height: 60
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10: 0
      }
    }}>
      <Screen 
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />
        }} 
        name="New Poll" 
        component={NewPool} 
      />
      <Screen 
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />
        }} 
        name="Polls" 
        component={Pools} 
      />
    </Navigator>
  );
}