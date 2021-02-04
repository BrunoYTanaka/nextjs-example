import React, { ComponentType } from 'react'
import { useSession } from 'next-auth/client'
import Redirect from '../components/Redirect'
import Loading from '../components/Loading'

export const withUser = (Component: ComponentType): ComponentType => {
  const WrapperComponent: React.FunctionComponent = () => {
    const [session, loading] = useSession()

    if (loading) {
      return <Loading />
    }

    if (!session && !loading) {
      return <Redirect to="/login" />
    }

    return <Component />
  }
  return WrapperComponent
}
