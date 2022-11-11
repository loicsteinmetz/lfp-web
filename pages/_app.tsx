import '../styles/reset.css'
import '../styles/fonts.css'
import '../styles/content.css'
import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
