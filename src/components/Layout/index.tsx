import React from 'react'
import Header from '../Header'
import { Container } from './styles'

import { withUser } from '../../hocs/withUser'

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

