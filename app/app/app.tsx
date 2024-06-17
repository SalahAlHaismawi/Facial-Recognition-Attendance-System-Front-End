import type { AppProps } from 'next/app';
import {app, auth} from '../firebaseConfig'
import { AuthProvider } from '../context/AuthContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }: AppProps) {
  console.log('app');
  return (
    <AuthProvider>
        <SpeedInsights>
            <Component {...pageProps} />

        </SpeedInsights>
    </AuthProvider>
  );
}

export default MyApp;