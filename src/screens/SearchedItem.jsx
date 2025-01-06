import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Recepies from '../components/recepies';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import tailwind from 'twrnc';
import { useTheme } from '../context/ThemeContext';

const SearchedItem = (props) => {
    const recepie = props.route.params;
    const insets = useSafeAreaInsets();
    const {theme}=useTheme();
    console.log(recepie)
  return (
    <ScrollView style={{paddingTop:insets.top,flex:1,backgroundColor:theme.background}}>
       <View style={tailwind`flex-row w-full items-center py-4 gap-20 `}><TouchableOpacity onPress={()=>props.navigation.goBack()} style={tailwind`ml-4 p-2 bg-amber-500 rounded-full`}><ArrowLeftIcon onPress={()=>props.navigation.goBack()} size={20} color={'white'}/></TouchableOpacity><Text style={tailwind`text-xl w-full text-[${theme.text}]  font-semibold `}>Searched Item</Text></View>
      <Recepies recepie={recepie} />
    </ScrollView>
  )
}

export default SearchedItem