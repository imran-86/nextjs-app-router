'use client'
import React, {  useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';
import { AuthContext } from './AuthContext';



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    // console.log(user);
     const googleProvider = new GoogleAuthProvider();

     useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
         setUser(currentUser);
          setLoading(false);

    })
    // Clear the observer on unmount
    return () =>{
        unsubscribe();
    }
    },[])
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
   
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const updateUser = (userData) => {
        setLoading(true)
        return updateProfile(auth.currentUser,userData)
    };

   

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInWithGoogle,
         updateUser 
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;