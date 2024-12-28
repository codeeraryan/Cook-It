import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView
} from 'react-native'
import React, {useState,useEffect} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { useFirebase } from '../context/FirebaseContext';
import tailwind from 'twrnc';
const Authentication = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(true);
 const {registerUser,loginUser,isLogin,email,SetEmail,Pass,SetPass}=useFirebase();

useEffect(()=>{isLogin?navigation.navigate("Home"):null},[isLogin]);
  
    const handleRegister=()=>{
      registerUser(email,Pass);
      
    }
    const handleLogin=()=>{
      loginUser(email,Pass);
      
    }
  return (
    <SafeAreaView style={{
      paddingTop: insets.top,
      flex: 1
    }}>
      <View style={tailwind `h-80 bg-[#FFC107] rounded-br-[60] rounded-bl-[30]`}></View>
      <View
        style={tailwind `absolute flex-1 h-full pt-${insets.top}  w-full justify-center items-center `}>
        <View style={tailwind `px-10 py-20 bg-white rounded-[10] shadow-xl `}>
          <View
            style={tailwind `rounded-full flex-row justify-between border-gray-200 border-2 shadow-md bg-white `}>
            <Pressable onPress={() => setActive(true)}>
              <Text
                style={tailwind `p-4 text-white font-semibold ${active
                ? `bg-[#FFC107]`
                : `text-[#FFC107]`} px-10 pr-12 rounded-full`}>LogIn</Text>
            </Pressable>
            <Pressable onPress={() => setActive(false)}>
              <Text
                style={tailwind `p-4 text-white ${active
                ? `text-[#FFC107]`
                : `bg-[#FFC107]`} font-semibold px-10 pl-12 rounded-full`}>SignUp</Text>
            </Pressable>
          </View>
          {active
            ? (
              <View>
                <View style={tailwind `mt-10 gap-5`}><TextInput
                  style={tailwind ` border-b-gray-500 m-1 border-b-[1px]`}
                  placeholder='Email' onChangeText={(e)=>SetEmail(e)} placeholderTextColor={'rgb(189, 189, 189)'}/>
                  <TextInput
                  style={tailwind ` border-b-gray-500 m-1 border-b-[1px]`}
                  placeholder='Password' onChangeText={(e)=>SetPass(e)} placeholderTextColor={'rgb(189, 189, 189)'}/></View>
                <Pressable
                  onPress={()=>handleLogin()}
                  style={tailwind `items-center justify-center mt-10 bg-[#FFC107] p-2 rounded-full `}>
                  <Text style={tailwind `text-xl text-white font-semibold`}>Login</Text>
                </Pressable>
              </View>
            )
            : (
                <View>
                <View style={tailwind `mt-10 gap-5`}><TextInput
                   onChangeText={(e)=>{SetEmail(e)}}
                  style={tailwind ` border-b-gray-500 m-1 border-b-[1px] `}
                  placeholder='Set Email'  placeholderTextColor={'rgb(189, 189, 189)'}/>
                  <TextInput
                  onChangeText={(e)=>{SetPass(e)}}
                  style={tailwind ` border-b-gray-500 m-1 border-b-[1px]`}
                  placeholder='Set Password' placeholderTextColor={'rgb(189, 189, 189)'}/>
                  <TextInput
                  style={tailwind ` border-b-gray-500 m-1 border-b-[1px]`}
                  placeholder='Confirm Password'  placeholderTextColor={'rgb(189, 189, 189)'}/></View>
                <Pressable
                onPress={()=>handleRegister()}
                  style={tailwind `items-center justify-center mt-10 bg-[#FFC107] p-2 rounded-full `}>
                  <Text style={tailwind `text-xl text-white font-semibold`}>Register</Text>
                </Pressable>
              </View>
            )}
        </View>

      </View>
      <StatusBar backgroundColor={'rgb(255, 193, 7)'}/>
    </SafeAreaView>
  )
}

export default Authentication

const styles = StyleSheet.create({})