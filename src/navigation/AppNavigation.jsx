
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import Welcome from '../screens/Welcome';
 
const Stack=createNativeStackNavigator();

 const AppNavigation=()=> {
   
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Homescreen}/>
        <Stack.Screen name='Splash' component={Welcome}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}
export default AppNavigation
