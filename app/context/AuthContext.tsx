'use client'
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '@/firebaseClient';
import { useRouter } from 'next/navigation';
import { log } from 'console';

export const AuthContext = createContext({
    user: null as User | null,
    isLoggedIn: false,
    Logout: () => Promise<void>, // Initialize with a no-op function
});

const app = initializeApp(firebaseConfig);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app); // Ensure you're passing the initialized app instance to getAuth
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe; // Clean-up for the listener
    }, []);

    const logout = async () => {
        const auth = getAuth(app);
        try {
            await signOut(auth);
            setUser(null); // Update state post-logout
            console.log('logged out')
            router.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout error:", error);
            // Handle errors (e.g., show a notification)
            console.log('error boss:', error)

        }
    };

    const authValue = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        logout,
    }), [user]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}
