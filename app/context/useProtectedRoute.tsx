import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext'; 
import { useRouter } from 'next/navigation'

const useProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

 

  return null; // Return null as this is just a protection hook, not a visual component
}

export default useProtectedRoute; 