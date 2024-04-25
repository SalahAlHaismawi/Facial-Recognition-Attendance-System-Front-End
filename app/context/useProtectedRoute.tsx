import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const useProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Wait until loading is complete before checking the login status
    if (!isLoading) {
      if (!isLoggedIn) {
        router.replace('/login');
      }
    }
  }, [isLoggedIn, isLoading, router]); // Include isLoading in the dependencies array

  return null;
};

export default useProtectedRoute;
