import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useTheme} from '../context/ThemeContext';
import {useFirebase} from '../context/FirebaseContext';
import {ArrowLeftIcon, ChevronLeftIcon, PencilIcon, PencilSquareIcon} from 'react-native-heroicons/solid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {profileImage, setProfileImage,theme,isDark,userDetail,setUserDetail} = useTheme();
  const handleSubmit = () => {
    setUserDetail(()=>{return {firstName,
      lastName,
      phoneNumber}})
      ToastAndroid.show("Updated", ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  const insets = useSafeAreaInsets();
  // Function to pick an image
  const handleLogOut = () => {
    logOutUser(navigation);
  }

  const {userEmail,logOutUser}=useFirebase();
  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [
        1, 1
      ], // Square aspect ratio
      quality: 1
    });
    console.log(result);
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Set the selected image URI
    }

  };

  return (
    <View behavior='padding' style={{
      flex: 1,
      paddingTop: insets.top,
      backgroundColor:theme.background
    }}>
      <View
        style={tailwind `flex-row w-full items-center py-1 px-4 justify-between `}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind ` p-2 bg-amber-500 rounded-full`}><ArrowLeftIcon onPress={() => navigation.goBack()} size={20} color={'white'}/></TouchableOpacity>
        <Text style={tailwind `text-xl text-[${theme.text}] font-semibold`}>Profile Update</Text>
        <TouchableOpacity>
        <Text onPress={handleSubmit} style={tailwind `text-amber-500`}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View >
          <Image source={profileImage
            ? {
              uri: profileImage
            }
            : require('../../assets/welcomee.png')} // Default profile image
            style={styles.profileImage}/>
          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
            <PencilSquareIcon color={'#fff'} size={20}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <KeyboardAvoidingView enabled style={tailwind`flex-1 `} behavior="height" >
      <ScrollView style={tailwind`flex-1 gap-3 p-4`}>
      {/* First Name */}
      <View style={tailwind`mb-4`}>
        <Text style={tailwind`text-lg font-semibold  text-xl py-2 text-[${theme.text}]`}>First Name</Text>
        <View style={tailwind`flex-row border border-gray-300 rounded-lg p-1 justify-between items-center`}>
        <TextInput
          style={tailwind`w-[70%] bg-[${theme.background}] text-[${theme.text}]`}
          placeholder="Enter First Name"
          placeholderTextColor={theme.border}
          value={firstName}
          onChangeText={setFirstName}
        />
        <PencilIcon color={'gray'} />
        </View>
      </View>

      {/* Last Name */}
      <View style={tailwind`mb-4`}>
        <Text style={tailwind`text-lg font-semibold  text-xl py-2  text-[${theme.text}]`}>Last Name</Text>
        <View style={tailwind`flex-row border border-gray-300 rounded-lg p-1 justify-between items-center`}>
        <TextInput
          style={tailwind`w-[70%] bg-[${theme.background}] text-[${theme.text}]`}
          placeholder="Enter Last Name"
          placeholderTextColor={theme.border}
          value={lastName}
          onChangeText={setLastName}
        />
        <PencilIcon color={'gray'} />
        </View>
      </View>

      {/* Email */}
      <View style={tailwind`mb-4`}>
        <Text style={tailwind`text-lg font-semibold text-xl py-2  text-[${theme.text}]`}>Email</Text>
        <View style={tailwind`flex-row border border-gray-300 rounded-lg p-1 justify-between items-center`}>
        <TextInput
          style={tailwind`w-[70%] bg-[${theme.background}] text-[${theme.text}]`}
          editable={false}
          placeholder={userEmail?.email}
          aria-disabled={true}
          placeholderTextColor={theme.text}
          keyboardType="email-address"
        />
        
        </View>
      </View>

      {/* Phone Number */}
      <View style={tailwind`mb-4`}>
        <Text style={tailwind`text-lg font-semibold text-xl py-2  text-[${theme.text}] `}>Phone Number</Text>
        <View style={tailwind`flex-row border border-gray-300 rounded-lg p-1 justify-between items-center`}>
        <TextInput
          style={tailwind`w-[70%] bg-[${theme.background}] text-[${theme.text}]`}
          placeholder="Enter Phone Number"
          placeholderTextColor={theme.border}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <PencilIcon color={'gray'} />
        </View>
      </View></ScrollView></KeyboardAvoidingView>
 
     <View style={tailwind ` px-4  w-full justify-center items-center `}>
      <Pressable style={tailwind`bg-amber-500 w-full p-3 justify-center items-center mb-1 rounded-xl`}  onPress={() => handleLogOut()}>
        <Text style={tailwind`text-white font-semibold text-xl`}>LogOut</Text>
      </Pressable>
      </View>
      <StatusBar style={`${isDark?"dark":"light"}`}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontSize: 24,
    fontailwindeight: 'bold',
    marginBottom: 20
  },
  imageContainer: {
    paddingTop: 20,
    alignItems: 'center'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 15
  },
  changeImageButton: {
    position: "absolute",
    bottom: 20,
    right: 0,
    backgroundColor: '#007BFF',
    padding: 6,
    borderRadius: "50%"
  }
});

export default Profile;
