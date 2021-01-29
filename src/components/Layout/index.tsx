import React from 'react'
import Header from '../Header'
import { Container } from './styles'
import { useSession } from 'next-auth/client'

const Layout: React.FC = ({ children }) => {

  const [session] = useSession()

  console.log(session)

  return (
    <>
      {/* <Header /> */}
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
