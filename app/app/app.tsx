import type { AppProps } from 'next/app';
import {app, auth} from '../firebaseConfig'
import { AuthProvider } from '@/app/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('app');
  return (
    <AuthProvider>

            <Component {...pageProps} />


    </AuthProvider>
  );
}

export default MyApp;