import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

const Loader = (props) => {
  return (
    <View style={tailwind`flex-1 justify-center items-center`}>
      <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loader