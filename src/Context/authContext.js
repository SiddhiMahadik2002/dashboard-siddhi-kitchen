import React, { useState, useEffect, createContext } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const adminLogin = async (adminEmail, adminPassword) => {
    setIsLoading(true)
    const q = query(collection(db, "admin"), where("email", "==", adminEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const {email, password} = doc.data();
      console.log({adminEmail, adminPassword, email, password})
      if(adminEmail == email && adminPassword == password ){
        cookies.set('token', '#token');
        setIsLogin(true)
        setIsLoading(false)
      }
      else{
        setIsLogin(false)
        setIsLoading(false)
      }
    });

  };

  const checkIsLogin = () => {
    const token = cookies.get('token')
    console.log(token)
    if(token){
        setIsLogin(true);
    }
  }

  const logoutAdmin = () => {
    cookies.remove("token")
    setIsLogin(false)

  }

  useEffect(() => {
    checkIsLogin()
  },[])

  const getAdminDetails = async () => {
    await getDocs(collection(db, "admin")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
    });
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, adminLogin, isLoading, checkIsLogin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
