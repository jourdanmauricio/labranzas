import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { localInterceptor } from '../services/localInterceptor';
import NotificationProvider from '@/commons/Notifications/NotificationProvider';

import { Roboto, Poppins, Mulish } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const mulish = Mulish({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

localInterceptor();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary-font: ${mulish.style.fontFamily};
          --secondary-font: ${roboto.style.fontFamily};
          --title-font: ${poppins.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={pageProps.session}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </SessionProvider>
    </>
  );
}
