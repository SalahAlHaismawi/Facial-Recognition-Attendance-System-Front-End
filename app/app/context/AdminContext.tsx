// context/AdminContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthContext';

interface AdminContextType {
    isAdmin: boolean;
    loading: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false, loading: true });

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoading: authLoading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            if (user?.email?.split('@')[0] === '1201303035') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                router.push('/'); // Redirect to home or a not authorized page if not admin
            }
            setLoading(false);
        }
    }, [user, authLoading, router]);

    return (
        <AdminContext.Provider value={{ isAdmin, loading }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
};
