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
  displayName: string | null;
  setDisplayName: (name: string) => void;
  };
  
  export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    logout: async () => {},
    isLoading: true,
    displayName: null,
    setDisplayName: () => {}
  });
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true); // Manage loading state
    const [displayName, setDisplayName] = useState<string | null>(null);

    const router = useRouter();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          setDisplayName(currentUser.displayName || null);
        }
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
      displayName: displayName || null,
      setDisplayName: setDisplayName,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return useContext(AuthContext);
};