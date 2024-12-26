
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import Welcome from '../screens/Welcome';
import RecepieDetails from '../screens/RecepieDetails';
import Profile from '../screens/Profile';
 
const Stack=createNativeStackNavigator();

 const AppNavigation=()=> {
   
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Homescreen}/>
        <Stack.Screen name='Splash' component={Welcome}/>
        <Stack.Screen name='RecepieDetails' component={RecepieDetails}/>
        <Stack.Screen name='Profile' component={Profile}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}
export default AppNavigation
