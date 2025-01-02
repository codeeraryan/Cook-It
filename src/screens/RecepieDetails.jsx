import { View, Text,Image, TouchableOpacity ,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { FadeIn, FadeInDown, SlideInDown } from 'react-native-reanimated';
import { ChevronLeftIcon , ClockIcon, FireIcon, StarIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, UserGroupIcon } from 'react-native-heroicons/solid';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../components/Loader';
import CookingDetails from '../components/CookingDetails';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
const RecepieDetails = (props) => {
    const item =props.route.params;
    const [fav,setFav]=useState(false);
    const [load,setLoad]=useState(true);
    const [mealData,setMealData]=useState(null);
    const navigation=useNavigation();
    const {theme,userFav,setUserFav}=useTheme();
 useEffect(()=>{getDetailedRecepies(item.idMeal);},[])
    const getDetailedRecepies=async(id)=>{
        try{
          const response =await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          if(response&&response.data){
            setMealData(response.data.meals[0])
            setLoad(false)
          }
        }
        catch(err){
          console.log("error: ",err.message)
        }
      }
  // for(var i=1;`{${mealData.strIngredient}+${i}}`=="";i++){console.log(`{${mealData.strIngredient}+${i}}`)} 
 const ingredientIndexes=()=>{
  if(!mealData) return [];
  let indexes=[];
  for(let i=1;i<=20;i++){
    if(mealData['strIngredient'+i]){
      indexes.push(i);
    }
  }
  return indexes;
 }
  
const getYoutubeVideoId=(url)=>{
const regex=/[?&]v=([^&]+)/;
const match =url?.match(regex);
if (match && match[1]){
  return match[1];
}
return null
}

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tailwind`flex-1 bg-[${theme.background}] text-[${theme.text}]`} >
        <View  style={tailwind`h-100 overflow-hidden bg-[${theme.background}] p-2`}>
            <Image style={tailwind`h-[100%] w-full rounded-8 mt-0 pt-0`} source={{uri:item?.strMealThumb}}/>
        </View>
         {/* back button and like button */}
         <Animated.View entering={FadeIn.delay(200).duration(1000)} style={tailwind`w-full absolute flex-row justify-between p-8`}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={tailwind`bg-white p-2 rounded-full`}><ChevronLeftIcon color="#fbbf24" size={hp(3.5)} strokeWidth={4.5} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setFav((prev)=>!prev);console.log(item);setUserFav((prev)=>{return [...prev, { ...item }]});console.log(userFav)}} style={tailwind`bg-white p-2 rounded-full`}><HeartIcon color={fav?"red":"gray"} size={hp(3.5)} strokeWidth={4.5} /></TouchableOpacity>
         </Animated.View>

          {/* mealDescription */}

        {load?<Loader style={tailwind`mt-20`} size="large"/> :
        <View style={tailwind`px-4 pt-6`}>

        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={tailwind`gap-2 py-2`}>
          <Text style={tailwind`text-xl font-semibold text-[${theme.text}]`}>{item?.strMeal}</Text>
          <Text style={tailwind`text-[${theme.text}]`}>{mealData.strArea}</Text>
        </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={tailwind`flex-row gap-3 p-1`}>  
        <CookingDetails heroIcon={<ClockIcon color="gray" size={hp(3.5)} strokeWidth={2.5} />} detail="mins" num={35}/>
        <CookingDetails heroIcon={<UserGroupIcon color="gray" size={hp(3.5)} strokeWidth={2.5} />} detail="servings" num={3}/>
        <CookingDetails heroIcon={<FireIcon color="gray" size={hp(3.5)} strokeWidth={2.5} />} detail="calories" num={103}/>
        <CookingDetails heroIcon={<StarIcon color="gray" size={hp(3.5)} strokeWidth={2.5} />} detail="Rating" num={"4/5"}/>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} >
        <Text style={tailwind`text-xl font-semibold py-4 text-[${theme.text}]`}>
        Ingredients :
        </Text>
    
{ingredientIndexes(mealData).map(i=>{
  return (
    <View key={i} style={tailwind`flex-row gap-2 p-1`}>
      <View style={tailwind`h-4 w-4 bg-amber-500 rounded-full`}/>
      <View style={tailwind`flex-row gap-2 `}>
        <Text style={tailwind`font-semibold text-[${theme.text}]`}>{mealData['strMeasure'+i]},</Text>
        <Text style={tailwind`text-[${theme.text}]`}>{mealData['strIngredient'+i]}</Text>
      </View>
    </View>

    
  )

})}
  </Animated.View>
        </View>
        
        }

  {/* instructions */}

      <View style={tailwind`p-4`}>
        <Text style={tailwind`text-xl font-semibold py-2 text-[${theme.text}]`}>
        Instructions:
        </Text>
        <Text style={tailwind`p-1 text-[${theme.text}]`}>{mealData?.strInstructions}</Text>
      </View>

     {/* yt video */}
   { mealData?.strYoutube && <View style={tailwind`p-4`}>
        <Text style={tailwind`text-xl font-semibold py-2 text-[${theme.text}]`}>
        Recepie Video:
        </Text>
        <View>
          <YoutubeIframe height={hp(30)} videoId={getYoutubeVideoId(mealData?.strYoutube)}/>
        </View>
      </View>}

      <StatusBar hidden={true} />
    </ScrollView>

  )
}

export default RecepieDetails