import React from 'react'
import Image from 'next/image'
import { Container, LoginContainer } from './styles'
import Link from 'next/link'
import { signOut } from 'next-auth/client'

const Header: React.FC = () => {

  const handleLogout = () => {
    signOut()
  }

  return (
    <Container>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={215} height={32} />
        </a>
      </Link>
      <LoginContainer onClick={handleLogout}>
        <div >
          Sair
        </div>
      </LoginContainer>
    </Container>
  )
}

export default Header
