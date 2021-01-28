import React from 'react'
import Header from '../Header'
import { Container } from './styles'
const Layout: React.FC = ({ children }) => {
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
