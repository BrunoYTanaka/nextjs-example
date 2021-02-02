import React from 'react'
import { withUser } from '../../hocs/withUser'
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

export default withUser(Layout)

