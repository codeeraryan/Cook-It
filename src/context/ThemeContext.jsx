import { createContext, useEffect } from 'react';
import React, { useState } from 'react'
import { useContext } from 'react';
import themes from '../../assets/colors';
const ThemeContext= createContext();
 
 

export const ThemeProvider = ({children}) => {
    const [isDark,setIsDark]=useState(false);
    const [theme,setTheme]=useState(themes.light);
    const [profileImage, setProfileImage] = useState(null);
    const [userDetail, setUserDetail] = useState({});
    const [userFav, setUserFav] = useState([]);
 useEffect(()=>{toggleSetTheme()},[]);
  const   toggleSetTheme=()=>{
      setIsDark(prev=>!prev);
     setTheme(isDark?themes.dark:themes.light);
    }
  return (
   <ThemeContext.Provider value={{isDark,setIsDark,toggleSetTheme,theme,profileImage,setProfileImage,userDetail,setUserDetail,userFav,setUserFav}}>{children}</ThemeContext.Provider>
  )
}


export default ThemeContext
export const useTheme=()=>useContext(ThemeContext);