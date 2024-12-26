import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
const Profile = () => {

  const {profileImage,setProfileImage}=useTheme();
  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:["images"],
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });
console.log(result);
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <View style={styles.imageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/welcomee.png')} // Default profile image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
          <Text style={styles.changeImageText}>Change Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  changeImageButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
