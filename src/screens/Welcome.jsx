import {Text,View,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{useSharedValue,withSpring} from 'react-native-reanimated';
import { useFirebase } from '../context/FirebaseContext'


export default function Welcome({navigation}) {
const {isLogin}=useFirebase();
const ring1padding=useSharedValue(0);
const ring2padding=useSharedValue(0);
  useEffect(()=>{
    setTimeout(() => {  ring1padding.value=withSpring(ring1padding.value+hp(5)) },100);
    setTimeout(() => {  ring2padding.value=withSpring(ring2padding.value+hp(5.5)) },300);
   isLogin? setTimeout(() => {  navigation.navigate("Home") },2500):setTimeout(() => {  navigation.navigate("Auth") },2500);
},[])
  return (
    <SafeAreaView style={tailwind`bg-amber-500 flex-1 justify-center items-center  gap-10`}>
      <Animated.View  style={{backgroundColor:"rgba(210,210,210, 0.3)",borderRadius:"50%",padding:ring2padding}} >
     <Animated.View style={{backgroundColor:"rgba(210,210,210, 0.3)",borderRadius:"50%",padding:ring1padding}}>
      <Image style={{height:hp(25), width:hp(25)}} source={require("../../assets/welcomee.png")}/>
     </Animated.View>
      </Animated.View>
     <View style={tailwind`items-center`}>
       <Text style={tailwind`text-white text-6xl font-semibold`}>Cook it</Text>
      <Text style={tailwind`text-white `}>Tailent make it tasty</Text>
      </View>
     <StatusBar style="light"/>
    </SafeAreaView>
  )
}