import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface RedirectProps {
  to: string
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [router, to])

  return null
}

export default Redirect
