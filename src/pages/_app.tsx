import GlobalStyle from '../styles/GlobalStyle'
import Background from './_background'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle/>
    {/* <Background/> */}
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
