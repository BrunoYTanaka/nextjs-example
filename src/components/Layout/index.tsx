import React from 'react'
import Header from '../Header'
import { Container } from './styles'
import { useSession } from 'next-auth/client'
import Redirect from '../Redirect'
import Loading from '../Loading'

const Layout: React.FC = ({ children }) => {

  const [session, loading] = useSession()

  if (loading) {
    return (<Loading/>)
  }

  if (!session && !loading) {
    return (<Redirect to="/login" />)
  }

  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout

