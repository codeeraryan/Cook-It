import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Recepies from '../components/recepies'
import { useTheme } from '../context/ThemeContext'
import tailwind from 'twrnc'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'

const Favourites = ({navigation}) => {
    const insets=useSafeAreaInsets();
    const {userFav,theme}=useTheme();
    
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:insets.top}}>
   <View style={tailwind`flex-row w-full items-center py-4 gap-25 `}><TouchableOpacity onPress={()=>navigation.goBack()} style={tailwind`ml-4 p-2 bg-amber-500 rounded-full`}><ArrowLeftIcon onPress={()=>navigation.goBack()} size={20} color={'white'}/></TouchableOpacity><Text style={tailwind`text-xl w-full text-[${theme.text}]  font-semibold`}>Favourites</Text></View>
    {userFav[0]==null?<View style={tailwind`h-full justify-center items-center `}><Image style={{height:250,width:250}} source={require("../../assets/noFav.png")}/><Text style={tailwind`text-[${theme.text}]`}>No Favourites</Text></View>:<Recepies recepie={userFav}/>}
    </ScrollView>
  )
}

export default Favourites