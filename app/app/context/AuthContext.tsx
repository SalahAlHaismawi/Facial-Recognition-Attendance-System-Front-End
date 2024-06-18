// src/context/AuthContext.js
'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { auth } from '../../firebaseConfig'; // Import the auth object directly

type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    logout: () => Promise<void>;
    isLoading: boolean;
  };
  
  export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    logout: async () => {},
    isLoading: true,
  });
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true); // Manage loading state
    const router = useRouter();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); // Set loading to false once the user is fetched
      });
      return () => unsubscribe(); // Cleanup on unmount
    }, []);
  
    const logout = async () => {
      try {
        await signOut(auth);
        setUser(null); // Clear user on logout
        router.push('/'); // Redirect to login after logout
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
  
    const value = {
      user,
      isLoggedIn: !!user,
      logout,
      isLoading,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };