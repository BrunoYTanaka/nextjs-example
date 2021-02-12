import React, { Fragment } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import GlobalStyle from '../styles/globalStyle'
import Layout from '../components/Layout'
import useLoading from '../hooks/useLoading'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { session } = pageProps
  useLoading()

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
