import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../component/Header';
import '../../Firebase/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name='description' content='Todo App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
