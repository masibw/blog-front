import '../../styles/globals.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import './pagination.css';
import '../../styles/sns-icon.css';
import { LoginProvider } from './login';
import * as gtag from '../lib/gtag';

const queryClient = new QueryClient();

export default ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <LoginProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>めしまし</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:site_name" content="めしまし" />
          <meta property="og:locale" content="ja_JP" />
          <meta name="description" content="サーバーサイドエンジニアの雑記" />
          <meta property="og:title" content="めしまし" />
          <meta
            property="og:description"
            content="サーバーサイドエンジニアの雑記"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mesimasi.com" />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:site_name" content="めしまし" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@masibw" />
          <meta property="og:locale" content="ja_JP" />
        </Head>
        <Header />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} className="bg-gray" />
        <Footer />
      </QueryClientProvider>
    </LoginProvider>
  );
};
