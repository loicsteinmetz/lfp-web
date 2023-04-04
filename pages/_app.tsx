import '../styles/reset.css'
import '../styles/fonts.css'
import type {AppProps} from 'next/app'
import {Analytics} from '@vercel/analytics/react';
import React from 'react';
import {ReCaptchaProvider} from 'next-recaptcha-v3';
import {envLFP} from '../utils/envLFP';

declare global {
  interface String {
    replaceJSX(this: string, find: string, replace: React.ReactNode) : React.ReactNode;
  }
}

String.prototype.replaceJSX = function(this: string, find, replace) {
  return this.split(find).flatMap((item) => [item, replace]);
}

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ReCaptchaProvider reCaptchaKey={envLFP.RECAPTCHA_SITE_KEY}>
      <Component {...pageProps} />
      <Analytics/>
    </ReCaptchaProvider>
  )
}

export default MyApp
