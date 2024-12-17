import { View, Text, Image } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import MasonryList from '@react-native-seoul/masonry-list'
import dishes from '../constants/dishes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loader from './Loader'



const Recepies = ({recepie}) => {
  return (
    <View style={tailwind`mx-4 my-8 `}>
      <Text style={tailwind`text-xl font-semibold`}>Recepies</Text>
      <View style={tailwind`h-100`}>
      {recepie.length==0?<Loader style={tailwind`mt-20`} size="large"/>:<MasonryList
        data={recepie}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item,i}) => <RecepieCard item={item} index={i} />}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({first: ITEM_CNT})}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)} 
        />}
      </View>
    </View>
  )
}

const RecepieCard=({item,index})=>{
  let isEven=index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}  style={tailwind` mb-5 ${isEven?`pr-4`:null}`}>
          <Image style={{height:index%3==0?hp(25):hp(35),width:"100%",borderRadius:35}} source={{uri:item.strMealThumb}}/>
           <Text style={tailwind`text-neutral-600 px-4 font-semibold`}>{item.strMeal.length>20?item.strMeal.slice(0,20)+'...':item.strMeal}</Text>
        </Animated.View>
    )
}

export default Recepies