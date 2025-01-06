import {  Text, View,StyleSheet,Image, TextInput,ScrollView, Button, Pressable, TouchableOpacity } from 'react-native'
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



export default function Homescreen({navigation}) {  
  const [cat,setCat]=useState('Beef');
  const [categories,setCategories]=useState([]);
  const [recepie,setRecepie]=useState([]);
  const [dark,setDark]=useState(false);
  const [searchValue,setSearchValue]=useState(null);
 
  const {isDark,setIsDark,toggleSetTheme,theme,profileImage,userEmail,userDetail}=useTheme();
  
  // useEffect(()=>userEmail?null:navigation.replace("Auth"),[userEmail])
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
    <SafeAreaView style={tailwind`flex-1 bg-[${theme.background}] text-[${theme.text}]`}>
      <ScrollView stickyHeaderIndices={[3]}>
{/* //TopIcons , profile and bell */}  
      <View style={tailwind`flex flex-row justify-between p-4 items-center `}>
  <Pressable onPress={()=>navigation.navigate('Profile')}><View  style={tailwind`items-center h-13 w-13 rounded-full overflow-hidden border-[1px] border-[${theme.text}] `}><Image  source={profileImage ? { uri: profileImage } : require('../../assets/welcomee.png')} style={tailwind`h-[100%] w-[100%] `}/></View></Pressable>
      <View style={tailwind`flex-row gap-4`}><Pressable  onPress={()=>{toggleSetTheme()}}>{isDark?<MoonIcon style={{height:hp(5),width:wp(5.5)}} color={"gray"}/>:<SunIcon style={{height:hp(5),width:wp(5.5)}} color={"white"} />}</Pressable><BellIcon style={{height:hp(5),width:wp(5.5)}} color="gray" /></View>
      </View>
{/* //greetings */}
      <View style={tailwind`space-y-2 mx-4 my-1 mb-4 `}>
        <View><Text style={tailwind` text-[${theme.text}]`}>Hey, {userDetail.firstName?userDetail.firstName:"userXYZ"}😊</Text></View>
        <View style={tailwind`flex-row mt-2`}><Text style={tailwind` text-xl font-semibold text-[${theme.text}]`}>What would You Like To </Text><Text style={tailwind`text-xl text-amber-500  font-semibold`}>Cook ?</Text></View>
      </View>
{/* //searchbar */}
      <View style={tailwind`space-y-2 mx-4 my-1 mb-4 bg-black/5 rounded-full border-white border-[0.5px] p-2 flex-row justify-between items-center`}>
         <TextInput onChangeText={setSearchValue} style={tailwind`h-full w-[80%] text-[${theme.text}] `} placeholder='Search recepie !' placeholderTextColor={'gray'}/>
     <TouchableOpacity onPress={()=>navigation.navigate("SearchedItem",recepie.filter((value)=>value.strMeal.includes(searchValue)))}><View style={tailwind`bg-white rounded-full p-2`}><MagnifyingGlassIcon style={{height:hp(4),width:wp(4.5)}} color={'gray'}/></View></TouchableOpacity>
      </View>
{/* //categories */}
      <View style={{backgroundColor:theme.background,height:hp(14),color:theme.text,borderRadius:2,borderColor:theme.text}}>
       {categories.length>0 && <Categories categories={categories} Category={cat} setCategory={setCat}/>}
      </View>
{/* //recepies */}
<View>
<Text style={tailwind`text-xl font-semibold mx-4 mt-8 text-[${theme.text}]`}>Recepies</Text>
<Recepies recepie={recepie}/>
</View>
      <StatusBar style={`${dark?"light":"dark"}`} />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 
})

