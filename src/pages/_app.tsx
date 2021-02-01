import React, { Fragment } from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/globalStyle'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { session } = pageProps

  const canShowLayout = !router.pathname.startsWith('/login')

  const WrapperLayout = canShowLayout ? Layout : Fragment

  return (
    <Provider session={session}>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
      <GlobalStyle />
    </Provider>
  )
}

export default MyApp
