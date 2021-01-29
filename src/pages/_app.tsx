import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/globalStyle'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <Provider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </Provider>
  )
}

export default MyApp
