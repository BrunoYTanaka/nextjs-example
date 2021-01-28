import React from 'react'
import Image from 'next/image'
import { Container } from './styles'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={215} height={32} />
        </a>
      </Link>
    </Container>
  )
}

export default Header
