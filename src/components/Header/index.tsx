import React, { useCallback, MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/client'
import { Container, LoginContainer } from './styles'

const Header: React.FC = () => {
  const handleLogout = useCallback((e: MouseEvent) => {
    e.preventDefault()
    signOut()
  }, [])

  return (
    <Container>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={215} height={32} />
        </a>
      </Link>
      <LoginContainer onClick={handleLogout}>
        <div>Sair</div>
      </LoginContainer>
    </Container>
  )
}

export default Header
