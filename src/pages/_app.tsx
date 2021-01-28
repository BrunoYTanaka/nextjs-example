import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/globalStyle'
import Layout from '../components/Layout'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </>
  )
}

export default MyApp
