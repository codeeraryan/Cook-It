import { View, Text, TouchableOpacity,ScrollView,Image, Alert } from 'react-native'
import dishes from '../constants/dishes'
import tailwind from 'twrnc'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown,} from 'react-native-reanimated';
import { useState } from 'react';

const Categories = ({Category,setCategory,categories}) => {
  
  
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      
   
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        { 
        categories.map((elem,index)=>{let isActive=elem.strCategory==Category;let activeClass=isActive?`bg-amber-500`:`bg-black/5`;return  <TouchableOpacity onPress={()=>setCategory(elem.strCategory)} style={tailwind`flex justify-center items-center`} key={`0${index}`}>
          <View  style={tailwind`m-4 rounded-full  ${activeClass} p-1 `}><Image style={{height:hp(6),width:hp(6),borderRadius:50}} source={{uri:elem.strCategoryThumb}} /></View>
          <Text style={tailwind`text-neutral-600`}>{elem.strCategory}</Text></TouchableOpacity>})
        }
      </ScrollView>
    
      
     
    </Animated.View>
  )
}

export default Categories