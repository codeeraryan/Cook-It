import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import MasonryList from '@react-native-seoul/masonry-list'
import dishes from '../constants/dishes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loader from './Loader'
import { useNavigation } from '@react-navigation/native'
import { SharedTransition } from 'react-native-reanimated'
import { useTheme } from '../context/ThemeContext'

const Recepies = ({recepie,Icon}) => {
  
  const navigation=useNavigation();
 
  return (
    <View style={tailwind`mx-4 my-4 flex-1`}>
      <View>
      {recepie.length==0?<Loader style={tailwind`mt-20`} size="large"/>:<MasonryList
        data={recepie}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item,i}) => <RecepieCard item={item} index={i} navigation={navigation} Icon={Icon} />}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({first: ITEM_CNT})}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)} 
        />}
      </View>
    </View>
  )
}

const RecepieCard=({item,index,navigation,Icon})=>{
  const {theme,userFav,setUserFav}=useTheme();
  let isEven=index%2==0;
    return (
        <Animated.View  entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}  style={tailwind` mb-5 ${isEven?`pr-4`:null}`}>
       { Icon&& <TouchableOpacity onPress={()=>setUserFav(()=>userFav.filter((value)=>value.strMeal!=item.strMeal))} style={tailwind`absolute z-1 p-2 bg-white border-[1px] border-[${theme.border}] rounded-full`}>{Icon}</TouchableOpacity>}
          <Pressable onPress={()=>navigation.navigate("RecepieDetails",{...item})}>
           <Image sharedTransitionTag="sharedTag"  style={{height:index%3==0?hp(25):hp(35),width:"100%",borderRadius:35}} source={{uri:item.strMealThumb}}/>
           <Text style={tailwind` px-4 font-semibold text-[${theme.text}]`}>{item.strMeal.length>20?item.strMeal.slice(0,20)+'...':item.strMeal}</Text>
          </Pressable>
        </Animated.View>
    )
}

export default Recepies