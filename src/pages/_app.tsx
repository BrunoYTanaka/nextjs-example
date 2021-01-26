import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Background from './_background'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Background />
      <div className="globalWrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
