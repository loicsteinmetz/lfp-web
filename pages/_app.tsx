import '../styles/reset.css'
import '../styles/fonts.css'
import type {AppProps} from 'next/app'
import {Analytics} from '@vercel/analytics/react';
import React, {useEffect} from 'react';
import {Router} from 'next/router';
import Loading from '../components/Loading';

declare global {
  interface String {
    replaceJSX(this: string, find: string, replace: React.ReactNode) : React.ReactNode;
  }
}

String.prototype.replaceJSX = function(this: string, find, replace) {
  return this.split(find).flatMap((item) => [item, replace]);
}

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('loadingScreen');
      if (loader) {
        loader.remove();
      }
    }
  }, []);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading && <Loading/>}
      {/*<Loading/>*/}
      <Component {...pageProps} />
      <Analytics/>
    </>
  )
}

export default MyApp
