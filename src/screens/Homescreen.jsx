import {  Text, View,StyleSheet,Image, TextInput,ScrollView, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import tailwind from 'twrnc';
import {BellIcon, MagnifyingGlassIcon, MoonIcon, SunIcon} from "react-native-heroicons/outline"
import Categories from '../components/categories';
import axios from 'axios';
import Recepies  from '../components/recepies';
import { useTheme } from '../context/ThemeContext';

export default function Homescreen() {
  const [cat,setCat]=useState('Beef');
  const [categories,setCategories]=useState([]);
  const [recepie,setRecepie]=useState([]);
  const [dark,setDark]=useState(false);
 
  const {isDark,setIsDark,toggleSetTheme,theme}=useTheme();


  useEffect(()=>{getCategories(),getRecepies(cat)},[cat])

  const getCategories=async()=>{
    try{
      const response =await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if(response&&response.data){
        setCategories(response.data.categories)
      }
    }
    catch(err){
      console.log("error: ",err.message)
    }
  }
  const getRecepies=async(cat)=>{
    try{
      const response =await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      if(response&&response.data){
        setRecepie(response.data.meals)
        
      }
    }
    catch(err){
      console.log("error: ",err.message)
    }
  }
  return (
    <SafeAreaView style={tailwind`bg-[${theme.background}] text-[${theme.text}]`}>
      <ScrollView stickyHeaderIndices={[3]}>
{/* //TopIcons , profile and bell */}  
      <View style={tailwind`flex flex-row justify-between p-4 items-center `}>
      <View style={tailwind`bg-blue-200 w-10  rounded-full flex justify-center items-center `}><Image style={{height:hp(5),width:wp(5.5)}} source={require('../../assets/welcomee.png')}/></View>
      <View style={tailwind`flex-row gap-4`}><Pressable  onPress={()=>{toggleSetTheme()}}>{isDark?<MoonIcon style={{height:hp(5),width:wp(5.5)}} color={"gray"}/>:<SunIcon style={{height:hp(5),width:wp(5.5)}} color={"white"} />}</Pressable><BellIcon style={{height:hp(5),width:wp(5.5)}} color="gray" /></View>
      </View>
{/* //greetings */}
      <View style={tailwind`space-y-2 mx-4 my-1 mb-4 `}>
        <View><Text style={tailwind` text-[${theme.text}]`}>Hey, Aryan😊</Text></View>
        <View style={tailwind`flex-row mt-2`}><Text style={tailwind` text-xl font-semibold text-[${theme.text}]`}>What would You Like To </Text><Text style={tailwind`text-xl text-amber-500  font-semibold`}>Cook ?</Text></View>
      </View>
{/* //searchbar */}
      <View style={tailwind`space-y-2 mx-4 my-1 mb-4 bg-black/5 rounded-full border-white border-[0.5px] p-2 flex-row justify-between items-center`}>
         <TextInput style={tailwind`h-full w-[80%]`} placeholder='Search recepie !' placeholderTextColor={'gray'}/>
         <View style={tailwind`bg-white rounded-full p-2`}><MagnifyingGlassIcon style={{height:hp(4),width:wp(4.5)}} color={'gray'}/></View>
      </View>
{/* //categories */}
      <View style={{backgroundColor:theme.background,height:hp(14),color:theme.text}}>
       {categories.length>0 && <Categories categories={categories} Category={cat} setCategory={setCat}/>}
      </View>
{/* //recepies */}
<View>
<Text style={tailwind`text-xl font-semibold mx-4 mt-8 ${dark?`text-white`:`text-gray`}`}>Recepies</Text>
<Recepies recepie={recepie}/>
</View>
      <StatusBar style={`${dark?"light":"dark"}`} />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 
})

