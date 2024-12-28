import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {createContext, useContext, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
const firebaseConfig = {
  apiKey: "AIzaSyDN3beHn93zbjTR4BnrPREGhCb8bljS23I",
  authDomain: "letscookiit.firebaseapp.com",
  projectId: "letscookiit",
  storageBucket: "letscookiit.firebasestorage.app",
  messagingSenderId: "717422309915",
  appId: "1:717422309915:web:9b5140802e1244cbfabebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseContext = createContext();
const auth = getAuth(app);

export const FirebaseProvider = ({children}) => {



  const [isLogin,
    setIsLogin] = useState(false);
  const [email,
    SetEmail] = useState("")
  const [Pass,
    SetPass] = useState("")
  const [userEmail,
    setUserEmail] = useState("")

    const registerUser = async(email, Pass) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, Pass);
      console.log("user registered : ", userCredential.user)
      ToastAndroid.show("Registered", ToastAndroid.SHORT, ToastAndroid.CENTER)
      setIsLogin(true);
      setUserEmail(userCredential.user)
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  const loginUser = async(email, Pass) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, Pass);
      console.log('User logged in:', userCredential.user);
      ToastAndroid.show("Logged In", ToastAndroid.SHORT, ToastAndroid.CENTER)
      setIsLogin(true);
      setUserEmail(userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const logOutUser = async() => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      ToastAndroid.show("Logged Out", ToastAndroid.SHORT, ToastAndroid.CENTER)
      setIsLogin(false);
      
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
      registerUser,
      loginUser,
      isLogin,
      setIsLogin,
      logOutUser,
      email,
      Pass,
      SetEmail,
      SetPass,
      userEmail,
    }}>{children}</FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext);