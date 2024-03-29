import AppBar from '@/components/AppBar/AppBar';
import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from '@/components/Footer/Footer';
import { ICategory, IContact } from '@/models';

interface IProps {
  children: ReactNode;
  categories: ICategory[];
  contact: IContact;
}

const MainLayout = ({ children, categories, contact }: IProps) => {
  return (
    <>
      <div className="min-h-full">
        <Head>
          <title>Labranzas</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppBar categories={categories} contact={contact} />

        <main>{children}</main>

        <Footer contact={contact} />
      </div>
    </>
  );
};

export default MainLayout;
