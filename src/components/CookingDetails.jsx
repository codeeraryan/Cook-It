import { View, Text } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useTheme } from '../context/ThemeContext';

const CookingDetails = ({num,detail,heroIcon}) => {
  const {theme}=useTheme();
  return (
   
      <View style={tailwind`p-4 rounded-full bg-amber-500 items-center`}>
                  <View style={tailwind`p-2 rounded-full bg-white items-center`}>{heroIcon}</View>
                  <Text style={tailwind`text-xl text-[${theme.text}]`}>{num}</Text>
                  <Text style={tailwind`text-[${theme.text}]`}>{detail}</Text>
      </View>
   
  )
}

export default CookingDetails