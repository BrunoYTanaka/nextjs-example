import React, { ComponentType } from 'react'
import { useSession } from 'next-auth/client'
import Redirect from '../components/Redirect'
import Loading from '../components/Loading'

export const withUser = (Component: ComponentType) => {
  const WrapperComponent: React.FC = () => {
    const [session, loading] = useSession()

    if (loading) {
      return <Loading />
    }

    if (!session && !loading) {
      return <Redirect to="/login" />
    }

    console.log(Component)

    return <Component />
  }
  return WrapperComponent
}
