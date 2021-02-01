import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface RedirectProps {
  to: string
}

const Redirect = ({ to }: RedirectProps) => {

  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [to])

  return null
}

export default Redirect

