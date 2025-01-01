import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFirebase } from '../context/FirebaseContext';
import tailwind from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatBubbleOvalLeftEllipsisIcon, ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/solid';
import { BiHelpCircle } from 'react-icons/bi';
import { ArrowRightStartOnRectangleIcon, ChevronRightIcon, Cog6ToothIcon, UserIcon } from 'react-native-heroicons/outline';
import Authentication from './Authentication';
const Profile = ({navigation}) => {
  const {theme}=useTheme();
  const {userEmail,logOutUser}=useFirebase();
  const insets=useSafeAreaInsets();
  
  const handleLogOut=()=>{logOutUser(navigation);}

  return (<View style={{flex:1,paddingTop:insets.top,backgroundColor:theme.background,}}>
   {userEmail&& <View><View style={tailwind`flex-row w-full items-center py-1 gap-25 `}><TouchableOpacity onPress={()=>navigation.goBack()} style={tailwind`ml-4 p-2 bg-amber-500 rounded-full`}><ChevronLeftIcon onPress={()=>navigation.goBack()} size={30} color={'white'}/></TouchableOpacity><Text style={tailwind`text-xl w-full text-[${theme.text}]  font-semibold`}>Profile</Text></View>
      <View style={tailwind`justify-center items-center p-10`}>
        <View style={tailwind`h-30 w-30`}><Image style={tailwind`h-[100%] w-[100%]`} source={require('../../assets/welcomee.png')}/></View>
        <Text style={tailwind`text-xl font-semibold text-[${theme.text}]`}>User123</Text>
        <Text style={tailwind`pt-2 text-[${theme.text}]`}>{userEmail.email}</Text>
      </View> 

      <View style={tailwind`flex flex-row justify-between px-5`}>
      <View style={tailwind`h-25 w-25 bg-gray-200 items-center justify-center rounded-3xl`}><BellIcon color={'#34c4ef'}/><Text>Notification</Text></View>
      <View style={tailwind`h-25 w-25 bg-gray-200  items-center justify-center rounded-3xl`}><ChatBubbleOvalLeftEllipsisIcon color={'#34ef34'}/><Text>Help!</Text></View>
      <View style={tailwind`h-25 w-25 bg-gray-200  items-center justify-center rounded-3xl`}><HeartIcon color={'red'}/><Text>Favourites</Text></View>
      </View>

      <View style={tailwind`p-3 pt-10 gap-5`}>
      <TouchableOpacity onPress={()=>navigation.navigate("MyProfile")} style={tailwind`p-4 bg-gray-200 items-center justify-center rounded-3xl flex-row justify-between`}><View style={tailwind`flex-row gap-4`}><UserIcon color={'gray'}/><Text>My Profile</Text></View><ChevronRightIcon color={'gray'}/></TouchableOpacity>
      <View style={tailwind`p-4 bg-gray-200 items-center justify-center rounded-3xl flex-row justify-between`}><View style={tailwind`flex-row gap-4`}><Cog6ToothIcon color={'gray'}/><Text>Notification Setting</Text></View><ChevronRightIcon color={'gray'}/></View>
      <TouchableOpacity onPress={()=>handleLogOut()} style={tailwind`p-4 bg-gray-200 items-center justify-center rounded-3xl flex-row justify-between`}><View style={tailwind`flex-row gap-4`}><ArrowRightStartOnRectangleIcon color={'red'}/><View ><Text>Log Out</Text></View></View></TouchableOpacity>
      </View></View>}</View>)}
export default Profile;
