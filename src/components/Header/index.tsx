import React from 'react'
import Image from 'next/image'
import { Container, LoginContainer } from './styles'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={215} height={32} />
        </a>
      </Link>
      <LoginContainer>
        <Link href="/login">
          <a>
            <strong>
              Fazer Login
            </strong>
          </a>
        </Link>
      </LoginContainer>
    </Container>
  )
}

export default Header