import { AuthContext, AuthContextProvider } from '@/lib/Context'
import '@/styles/globals.scss'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
export default function App({ Component, pageProps }) {
  return (
  <AuthContextProvider>
  <Component {...pageProps} />
  </AuthContextProvider>
  )
}
