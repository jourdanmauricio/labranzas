import AppBar from '@/components/AppBar/AppBar';
import Head from 'next/head';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <div className="min-h-full">
        <Head>
          <title>Labranzas</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppBar />

        <main className="h-screen">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
