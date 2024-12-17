import { View, Text } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'


const CookingDetails = ({num,detail,heroIcon}) => {
  return (
   
      <View style={tailwind`p-4 rounded-full bg-amber-500 items-center`}>
                  <View style={tailwind`p-2 rounded-full bg-white items-center`}>{heroIcon}</View>
                  <Text style={tailwind`text-xl text-gray`}>{num}</Text>
                  <Text>{detail}</Text>
      </View>
   
  )
}

export default CookingDetails