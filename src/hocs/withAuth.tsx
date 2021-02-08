import React from 'react'
import { useSession } from 'next-auth/client'
import Redirect from '../components/Redirect'
import Loading from '../components/Loading'

interface IProps {
  children: React.ReactNode
}

export function WithAuth(Component: React.ComponentType): React.FC {
  const AuthWrapper = (props: IProps) => {
    const [session, loading] = useSession()

    if (loading) {
      return <Loading />
    }

    if (!session && !loading) {
      return <Redirect to="/login" />
    }
    return <Component {...props} />
  }
  return AuthWrapper
}
