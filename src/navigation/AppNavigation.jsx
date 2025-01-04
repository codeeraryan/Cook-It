
import React from 'react'
import {DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import Welcome from '../screens/Welcome';
import RecepieDetails from '../screens/RecepieDetails';
import Profile from '../screens/Profile';
import Authentication from '../screens/Authentication';
import MyProfile from '../screens/MyProfile'
import { useFirebase } from '../context/FirebaseContext';
import Favourites from '../screens/Favourites';
import SearchedItem from '../screens/SearchedItem';
const Stack=createNativeStackNavigator();

 const AppNavigation=()=> {
 
  return (
   <NavigationContainer  >
    <Stack.Navigator initialRouteName='Splash'  screenOptions={{headerShown:false,animation:'slide_from_bottom'}}>
        <Stack.Screen  name='Home' component={Homescreen}/>
        <Stack.Screen name='Splash' component={Welcome}/>
        <Stack.Screen name='RecepieDetails' component={RecepieDetails}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Auth' component={Authentication}/>
        <Stack.Screen name='MyProfile' component={MyProfile}/>
        <Stack.Screen name='fav' component={Favourites}/>
        <Stack.Screen name='SearchedItem' component={SearchedItem}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}
export default AppNavigation
